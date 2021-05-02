import {
  useCallback
} from 'preact/hooks';
import useSWR from 'swr';

import * as types from '~/types.js';

import {
  deleteData,
  postData,
  putData,
  rawRequest
} from '~/utils/api.js';

const ABOUT_ONE_MONTH_IN_MS = 1000 * 86400 * 30;

function useCallbackFactory(fn, args) {
  return useCallback(fn(...args), args);
}

/**
 * @typedef {Object} SwrOpts
 * @property {T} [data]
 * @property {string} [error]
 * @property {function} mutate
 * @template T
 */

/**
 * @typedef {Object} CreateOpts
 * @property {boolean} [raw]
 */

/**
 * @typedef {Object} DeleteOpts
 * @property {boolean} [raw]
 */

/**
 * @typedef {Object} GetOpts
 * @property {boolean} [raw]
 */

/**
 * @typedef {Object} UpdateOpts
 * @property {boolean} [raw]
 */

/**
 * @typedef {Object} RemoteDataOtherOpts
 * @property {CreateOpts} createOpts
 * @property {DeleteOpts} deleteOpts
 * @property {GetOpts} getOpts
 * @property {UpdateOpts} updateOpts
 */

/**
 * @typedef {Object} RemoteDataOpts
 * @property {string} apiEndpoint
 * @property {RemoteDataOtherOpts} opts
 */

function getCreateDataFunction(cacheKey, swrOpts, createDataOpts) {
  const {
    mutate
  } = swrOpts
  const {
    apiEndpoint,
    fetchOpts
  } = createDataOpts;

  return async function doCreate(next) {
    /* step 1: optimistic local update */
    // TODO: need api envelope
    mutate(next, false);

    /* step 2: make remote update */
    const createEndpoint = apiEndpoint || cacheKey;
    const response = await postData(createEndpoint, next, fetchOpts);

    /* step 3: sync local data with remote */
    mutate(response, false);
  };
}

function getUpdateDataFunction(cacheKey, swrOpts, updateDataOpts) {
  const {
    data,
    mutate
  } = swrOpts
  const {
    apiEndpoint,
    fetchOpts
  } = updateDataOpts;

  return async function doUpdate(nextState) {
    const next = typeof nextState === `function`
      ? nextState(data?.data)
      : nextState;

    /* step 1: optimistic local update */
    mutate(
      { ...data, data: next },
      false
    );

    /* step 2: make remote update */
    const updateEndpoint = apiEndpoint || cacheKey;
    const response = await putData(updateEndpoint, next, fetchOpts);

    /* step 3: sync local data with remote */
    mutate(response);
  };
}

function getDeleteDataFunction(cacheKey, swrOpts, deleteDataOpts) {
  const {
    mutate
  } = swrOpts;
  const {
    apiEndpoint,
    fetchOpts
  } = deleteDataOpts;

  return async function doDelete() {
    /* step 1: optimistic local update */
    mutate(undefined, false);

    /* step 2: make remote update */
    const deleteEndpoint = apiEndpoint || cacheKey;
    await deleteData(deleteEndpoint, fetchOpts);

    /* step 3: sync local data with remote */
    mutate(undefined);
  };
}


/**
 * @param {RemoteDataOpts} remoteDataOpts
 */
function useRemoteData(remoteDataOpts) {
  const {
    apiEndpoint,
    opts = {}
  } = remoteDataOpts;
  const {
    createOpts = {},
    deleteOpts = {},
    raw,
    updateOpts = {},
    ...userSwrOpts
  } = opts;
  const defaultSwrOpts = {
    dedupingInterval: ABOUT_ONE_MONTH_IN_MS
  };
  const swrOpts = {
    ...defaultSwrOpts,
    ...userSwrOpts
  };
  const swr = useSWR(apiEndpoint, rawRequest, swrOpts);
  const {
    data: swrData,
    error
  } = swr;
  const doCreate = useCallbackFactory(
    getCreateDataFunction,
    [ apiEndpoint, swr, createOpts ]
  );
  const doUpdate = useCallbackFactory(
    getUpdateDataFunction,
    [ apiEndpoint, swr, updateOpts ]
  );
  const doDelete = useCallbackFactory(
    getDeleteDataFunction,
    [ apiEndpoint, swr, deleteOpts ]
  );
  const data = raw
    ? swrData
    : (swrData?.data ?? []);
  const metadata = raw
    ? undefined
    : (swrData?.metadata ?? {});

  return {
    data,
    doCreate,
    doDelete,
    doUpdate,
    error,
    metadata
  };
}

export {
  useRemoteData
};
