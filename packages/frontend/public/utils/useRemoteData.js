import {
  useCallback,
  useEffect,
  useState
} from 'preact/hooks';

import {
  deleteData,
  getData,
  postData,
  putData
} from '~/utils/api.js';
import {
  DataCache
} from '~/utils/dataCache.js';

/**
 * @typedef RemoteObjectOpts
 * @property {boolean} [defer]
 * @property {RequestInit} [deleteOpts]
 * @property {RequestInit} [getOpts]
 * @property {boolean} [noCache]
 * @property {RequestInit} [postOpts]
 * @property {RequestInit} [putOpts]
 * @property {boolean} [raw]
 * @property {number} [ttl]
 */


const dataCache = new DataCache();

/**
 * @param {string} path
 * @param {RemoteObjectOpts} [opts]
 * @return {import('~/t').RemoteObject<T>}
 * @template T
 */
function useRemoteObject(path, opts) {
  const {
    deleteOpts,
    getOpts,
    noCache,
    postOpts,
    putOpts,
    raw,
    ttl
  } = opts ?? {};
  const [ busy, setBusy ] = useState(false);
  /** @type {import('~/t').LocalState<T|undefined>} */
  const [ data, setData ] = useState();
  const del = useCallback(
    async function doDelete() {
      setBusy(true);

      try {
        await deleteData(path, deleteOpts);

        setData(undefined);

        if (!noCache) {
          dataCache.clear(path);
        }
      }
      catch (ex) {
        console.error(ex);
      }

      setBusy(false);
    },
    [ noCache, deleteOpts, path ]
  );
  const get = useCallback(
    async function doGet() {
      /** @type {import('~/utils/dataCache').CacheEntry<T>|undefined} */
      const cacheEntry = !noCache
        ? dataCache.get(path)
        : undefined;

      if (cacheEntry) {
        setData(cacheEntry.data);

        return;
      }

      setBusy(true);

      try {
        if (!noCache) {
          dataCache.set(path, undefined, ttl);
        }

        const response = await getData(path, getOpts);
        const unwrapped = raw
          ? response
          : response.data?.[0];

        setData(unwrapped);

        if (!noCache) {
          dataCache.set(path, unwrapped, ttl);
        }
      }
      catch (ex) {
        console.error(ex);
      }

      setBusy(false);
    },
    [ noCache, raw, getOpts, path, ttl ]
  );
  const post = useCallback(
    /** @param {Partial<T>} payload */
    async function doCreate(payload) {
      setBusy(true);

      try {
        /** @type {import('dto').DtoWrapper<T>} */
        const response = await postData(path, payload, postOpts);

        setData(response.data[0]);

        if (!noCache) {
          dataCache.set(path, response.data[0], ttl);
        }
      }
      catch (ex) {
        console.error(ex);
      }

      setBusy(false);
    },
    //    [noCache, postOpts, path, ttl]
    []
  );
  const put = useCallback(
    /** @param {T} payload */
    async function doUpdate(payload) {
      setBusy(true);

      try {
        await putData(path, payload, putOpts);
      }
      catch (ex) {
        console.error(ex);
      }

      setBusy(false);
    },
    [ noCache, putOpts, get, path ]
  );

  useEffect(
    function fetchOnMount() {
      if (!opts?.defer) {
        get();
      }
    },
    []
  );

  useEffect(
    function syncOnExternalUpdate() {
      if (noCache) {
        return;
      }

      // TODO: figure out why this isn't typing correctly
      /**
       * @param {any} newData
       */
      function onUpdate(newData) {
        setData(/** @type {T} */(newData));
      }

      dataCache.on(path, onUpdate);

      return function cleanup() {
        dataCache.off(path, onUpdate);
      }
    },
    [ noCache, path ]
  );

  return {
    busy,
    data,
    del,
    get,
    post,
    put
  }
}

/**
 * @param {string} path
 * @param {Omit<RemoteObjectOpts, 'raw'>} [opts]
 * @template T
 */
function useRemoteCollection(path, opts) {
  const {
    deleteOpts,
    getOpts,
    noCache,
    postOpts,
    putOpts,
    ttl
  } = opts ?? {};
  const [ busy, setBusy ] = useState(false);
  /** @type {import('~/t').LocalState<import('dto').Indexed<T>[]|undefined>} */
  const [ data, setData ] = useState();
  const del = useCallback(
    /**
     * @param {import('dto').Indexed<T>} oldObj
     */
    async function doDelete(oldObj) {
      setBusy(true);

      try {
        const idx = data?.findIndex(
          (obj) => obj._id === oldObj._id
        ) ?? -1;

        await deleteData(`${path}/${oldObj._id}`, deleteOpts);

        if (idx !== -1) {
          const nextData = [
            ...(data ?? []).slice(0, idx),
            ...(data ?? []).slice(idx + 1)
          ];

          setData(nextData);

          if (!noCache) {
            dataCache.set(path, nextData, ttl);
          }
        }
      }
      catch (ex) {
        console.error(ex);
      }

      setBusy(false);
    },
    [ data, noCache, deleteOpts, path ]
  );
  const get = useCallback(
    async function doGet() {
      const cacheEntry = !noCache
        ? dataCache.get(path)
        : undefined;

      if (cacheEntry) {
        setData(cacheEntry.data);

        return;
      }

      setBusy(true);

      try {
        if (!noCache) {
          dataCache.set(path, undefined, ttl);
        }

        const response = await getData(path, getOpts);

        setData(response.data);

        if (!noCache) {
          dataCache.set(path, response.data, ttl);
        }
      }
      catch (ex) {
        console.error(ex);
      }

      setBusy(false);
    },
    [ getOpts, noCache, path, ttl ]
  );
  const post = useCallback(
    /** @param {Partial<T>} payload */
    async function doPost(payload) {
      setBusy(true);

      try {
        /** @type {import('dto').DtoWrapper<T>} */
        const response = await postData(path, payload, postOpts);
        const nextData = [
          ...(data ?? []),
          response.data[0]
        ];

        setData(nextData);

        if (!noCache) {
          dataCache.set(path, nextData, ttl);
        }
      }
      catch (ex) {
        console.error(ex);
      }

      setBusy(false);
    },
    [ data, noCache, postOpts, path, ttl ]
  );

  const put = useCallback(
    /** @param {import('dto').Indexed<T>} nextObj */
    async function doUpdate(nextObj) {
      setBusy(true);

      try {
        const idx = data?.findIndex(
          (obj) => obj._id === nextObj._id
        ) ?? -1;

        await putData(`${path}/${nextObj._id}`, putOpts);

        if (idx !== -1) {
          const nextData = [
            ...(data ?? []).slice(0, idx),
            nextObj,
            ...(data ?? []).slice(idx + 1)
          ];

          setData(nextData);

          if (!noCache) {
            dataCache.set(path, nextData, ttl);
          }
        }
      }
      catch (ex) {
        console.error(ex);
      }

      setBusy(false);
    },
    [ data, noCache, putOpts, get, path ]
  );

  useEffect(
    function fetchOnMount() {
      if (!opts?.defer) {
        get();
      }
    },
    []
  );

  useEffect(
    function syncOnExternalUpdate() {
      if (noCache) {
        return;
      }

      // TODO: figure out why this isn't typing correctly
      /**
       * @param {any} newData
       */
      function onUpdate(newData) {
        setData(/** @type {T[]} */(newData));
      }

      dataCache.on(path, onUpdate);

      return function cleanup() {
        dataCache.off(path, onUpdate);
      }
    },
    [ noCache, path ]
  );

  return {
    busy,
    data,
    del,
    get,
    post,
    put
  };
}


export {
  useRemoteObject,
  useRemoteCollection
};
