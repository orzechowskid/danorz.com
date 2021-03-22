import {
  useCallback,
  useEffect,
  useState
} from 'preact/hooks';
import useSWR from 'swr';

import * as types from '~/types.js';

import {
  rawRequest
} from '~/utils/api.js';

/**
 * @typedef {Object} RemoteDataOpts
 * @property {string} apiEndpoint
 * @property {Object} createOpts
 * @property {Object} deleteOpts
 * @property {Object} getOpts
 * @property {boolean} [getOpts.immediate]
 * @property {Object} updateOpts
 */

/**
 * @typedef {Object} RemoteDataResult
 * @property {Object} data
 * @property {string} localError
 * @property {Object} metadata
 * @property {(arg0: Object) => void} doCreate
 * @property {(arg0: Object) => void} doDelete
 * @property {() => void} doGet
 * @property {(arg0: Object) => void} doUpdate
 */

/**
 * @param {RemoteDataOpts} opts
 * @return {RemoteDataResult}
 */
function useRemoteData(opts) {
  const {
    apiEndpoint,
    createOpts = {},
    deleteOpts = {},
    getOpts = {},
    updateOpts = {}
  } = opts;
  /** @type {types.LocalState<types.RemoteData<Object>>} */
  const [ remoteData, setRemoteData ] = useState();
  /** @type {types.LocalState<boolean>} */
  const [ immediate, setImmediate ] = useState(getOpts.immediate ?? true);
  const {
    once,
    ...otherGetOpts
  } = getOpts;
  const getKey = useCallback(function getKey() {
    return immediate && apiEndpoint;
  }, [ apiEndpoint, immediate ]);
  const isPaused = useCallback(function isPaused() {
    return remoteData && !once;
  }, [ once, remoteData ]);
  const swrGetOpts = {
    isPaused,
    ...otherGetOpts
  };
  const {
    data,
    error,
    mutate
  } = useSWR(getKey, rawRequest, swrGetOpts);
  const doGet = useCallback(function doGet() {
    setImmediate(true);
  }, []);
  const doUpdate = useCallback(async function doUpdate(newData) {
    const {
      headers: updateHeaders = {},
      ...otherUpdateOpts
    } = updateOpts;
    const payload = [].concat(newData);

    /* optimistic local update */
    mutate({
      data: payload,
      metadata: {
        ...remoteData.metadata,
        total: payload.length
      }
    }, false);

    /* make api call */
    const result = await rawRequest(getKey(), {
      body: JSON.stringify(newData),
      headers: {
        'Content-Type': `application/json`,
        ...updateHeaders
      },
      method: `PUT`,
      ...otherUpdateOpts
    });

    /* reconcile local data with remote */
    mutate(result);
  }, [ getKey, remoteData, updateOpts ]);

  const doCreate = useCallback(async function doCreate(newData) {
    const {
      headers: createHeaders = {},
      ...otherCreateOpts
    } = createOpts;

    /* optimistic local update */
    mutate({
      data: [].concat(newData),
      metadata: { total: 1 }
    }, false);

    /* make api call */
    const result = await rawRequest(getKey(), {
      body: JSON.stringify(newData),
      headers: {
        'Content-Type': `application/json`,
        ...createHeaders
      },
      method: `POST`,
      ...otherCreateOpts
    });

    /* reconcile local data with remote */
    mutate(result);
  }, [ getKey ]);

  const doDelete = useCallback(async function doDelete() {
    /* optimistic local update */
    mutate({
      data: [],
      metadata: { total: 0 }
    }, false);

    /* make api call */
    await rawRequest(getKey(), {
      method: `DELETE`,
      ...deleteOpts
    });

    /* reconcile local data with remote */
    const result = await rawRequest(getKey(), {
      method: `GET`,
      ...getOpts
    });

    mutate(result);
  }, [ getKey ]);

  useEffect(function onRemoteData() {
    setRemoteData(data);
  }, [ data ]);

  return {
    data: remoteData?.data,
    doCreate,
    doDelete,
    doGet,
    doUpdate,
    localError: error,
    metadata: remoteData?.metadata
  };
}

function useGetData() {}

export {
  useRemoteData,
  useGetData
};
