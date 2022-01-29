import {
  useCallback,
  useEffect
} from 'preact/hooks';

import {
  deleteData,
  getData,
  postData,
  putData,
  rawFetch
} from '~/utils/api.js';
import {
  DataCache
} from '~/utils/dataCache.js';
import {
  useStateWhenMounted
} from '~/utils/useStateWhenMounted.js';

/**
 * @typedef ExtraRequestOpts
 * @property {boolean} [noCache]
 * @property {boolean} [rawRequest]
 * @property {boolean} [rawResponse]
 *
 * @typedef {RequestInit & ExtraRequestOpts} RequestOpts
 *
 * @typedef RemoteObjectOpts
 * @property {boolean} [defer]
 * @property {RequestOpts} [deleteOpts]
 * @property {RequestOpts} [getOpts]
 * @property {RequestOpts} [postOpts]
 * @property {RequestOpts} [putOpts]
 * @property {number} [ttl]
 */

const dataCache = new DataCache();

/**
 * @param {string} path
 * @param {RemoteObjectOpts} [opts]
 * @return {import('~/t').RemoteObject<T, CreateShape, UpdateShape>}
 * @template T
 * @template CreateShape
 * @template UpdateShape
 */
function useRemoteObject(path, opts) {
  const {
    deleteOpts,
    getOpts,
    postOpts,
    putOpts,
    ttl
  } = opts ?? {};
  /** @type {import('~/t').LocalState<T|undefined>} */
  const [ data, setData ] = useStateWhenMounted(getOpts?.noCache ? undefined : dataCache.get(path)?.data);
  const [ ready, setReady ] = useStateWhenMounted(getOpts?.noCache ? false : !!data);
  const del = useCallback(
    async function doDelete() {
      try {
        const {
          noCache,
          rawRequest,
          rawResponse,
          ...deleteOptions
        } = deleteOpts ?? {};
        await deleteData(path, deleteOptions);

        setData(undefined);

        if (!noCache) {
          dataCache.clear(path);
        }
      }
      catch (ex) {
        console.error(ex);
      }

      setReady(true);
    },
    [ deleteOpts, path ]
  );
  const get = useCallback(
    async function doGet(force = false) {
      /** @type {import('~/utils/dataCache').CacheEntry<T>|undefined} */
      const cacheEntry = !getOpts?.noCache && !force
        ? dataCache.get(path)
        : undefined;

      if (cacheEntry) {
        setData(cacheEntry.data);
        setReady(true);

        return;
      }

      try {
        const {
          noCache,
          rawRequest,
          rawResponse,
          ...getOptions
        } = getOpts ?? {};

        if (!noCache) {
          dataCache.set(path, undefined, ttl);
        }

        const response = await getData(path, getOptions);
        const unwrapped = rawResponse
          ? response
          : response.data?.[0];
        setData(unwrapped);

        if (!noCache) {
          dataCache.set(path, unwrapped, ttl);
        }
      }
      catch (ex) {
        console.error(path, ex);
      }

      setReady(true);
    },
    [ getOpts, path, ttl ]
  );
  const post = useCallback(
    /** @param {CreateShape} payload */
    async function doCreate(payload) {
      try {
        const {
          noCache,
          rawRequest,
          rawResponse,
          ...postOptions
        } = postOpts ?? {};
        let response = null;

        if (rawRequest) {
          const request = await rawFetch(path, {
            method: `POST`,
            ...postOptions,
            /* this can be anything */
            /* @ts-ignore */
            body: payload
          });

          response = await request.json();
        }
        else {
          response = await postData(path, payload, postOpts);
        }

        if (!rawResponse) {
          setData(/** @type {import('dto').DtoWrapper<T>} */(response.data[0]));

          if (!noCache) {
            dataCache.set(path, response.data[0], ttl);
          }
        }
      }
      catch (ex) {
        console.error(ex);
      }

      setReady(true);
    },
    [ postOpts, path, ttl ]
  );
  const put = useCallback(
    /** @param {UpdateShape} payload */
    async function doUpdate(payload) {
      try {
        const {
          noCache,
          rawRequest,
          rawResponse,
          ...putOptions
        } = putOpts ?? {};

        await putData(path, payload, putOptions);
        get(true);
      }
      catch (ex) {
        console.error(ex);
      }

      setReady(true);
    },
    [ putOpts, get, path ]
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
      if (getOpts?.noCache) {
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
    [ getOpts?.noCache, path ]
  );

  return {
    busy: !ready,
    data,
    del,
    get,
    post,
    put
  }
}

/**
 * @param {string} path
 * @param {RemoteObjectOpts} [opts]
 * @template T
 */
function useRemoteCollection(path, opts) {
  const {
    deleteOpts,
    getOpts,
    postOpts,
    putOpts,
    ttl
  } = opts ?? {};
  const [ busy, setBusy ] = useStateWhenMounted(false);
  /** @type {import('~/t').LocalState<import('dto').Indexed<T>[]|undefined>} */
  const [ data, setData ] = useStateWhenMounted();
  const del = useCallback(
    /**
     * @param {import('dto').Indexed<T>} oldObj
     */
    async function doDelete(oldObj) {
      setBusy(true);

      try {
        const {
          noCache,
          rawRequest,
          rawResponse,
          ...deleteOptions
        } = deleteOpts ?? {};
        const idx = data?.findIndex(
          (obj) => obj._id === oldObj._id
        ) ?? -1;

        await deleteData(`${path}/${oldObj._id}`, deleteOptions);

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
    [ data, deleteOpts, path ]
  );
  const get = useCallback(
    async function doGet() {
      const {
        noCache,
        rawRequest,
        rawResponse,
        ...getOptions
      } = getOpts ?? {};
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

        const response = await getData(path, getOptions);

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
    [ getOpts, path, ttl ]
  );
  const post = useCallback(
    /** @param {Partial<T>} payload */
    async function doPost(payload) {
      setBusy(true);

      try {
        const {
          noCache,
          rawRequest,
          rawResponse,
          ...postOptions
        } = postOpts ?? {};
        /** @type {import('dto').DtoWrapper<T>} */
        const response = await postData(path, payload, postOptions);
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
    [ data, postOpts, path, ttl ]
  );

  const put = useCallback(
    /** @param {import('dto').Indexed<T>} nextObj */
    async function doUpdate(nextObj) {
      setBusy(true);

      try {
        const {
          noCache,
          rawRequest,
          rawResponse,
          ...putOptions
        } = putOpts ?? {};
        const idx = data?.findIndex(
          (obj) => obj._id === nextObj._id
        ) ?? -1;

        await putData(`${path}/${nextObj._id}`, putOptions);

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
    [ data, putOpts, get, path ]
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
      if (getOpts?.noCache) {
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
    [ getOpts?.noCache, path ]
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
