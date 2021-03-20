import {
  useCallback,
  useEffect,
  useState
} from 'preact/hooks';
import useSWR from 'swr';

import * as types from '~/types.js';

import {
  rawRequest
} from './api';

/**
 * @typedef {Object} RemoteDataOpts
 * @property {string} apiEndpoint
 * @property {Object} getOpts
 * @property {boolean} [getOpts.immediate]
 * @property {Object} setOpts
 */

/**
 * @typedef {Object} RemoteDataResult
 */

/**
 * @param {RemoteDataOpts} opts
 * @return {RemoteDataResult}
 */
function useRemoteData(opts) {
  const {
    apiEndpoint,
    getOpts = {},
    setOpts = {}
  } = opts;
  /** @type {types.LocalState<Object>} */
  const [ remoteData, setRemoteData ] = useState();
  /** @type {types.LocalState<boolean>} */
  const [ immediate, setImmediate ] = useState(getOpts.immediate ?? true);
  const {
    once,
    ...otherGetOpts
  } = getOpts;
  const getKey = useCallback(function getKey() {
    return immediate && apiEndpoint;
  }, [ immediate ]);
  const isPaused = useCallback(function isPaused() {
    return remoteData && !once;
  }, [ remoteData ]);
  function go(...argz) {
    console.log(argz);
  };
  const swrGetOpts = {
    isPaused,
    ...otherGetOpts
  };
  const {
    data,
    error,
    isValidating,
    mutate
  } = useSWR(getKey, rawRequest, swrGetOpts);
  const doGet = useCallback(function doGet() {
    setImmediate(true);
  }, []);
  const doSet = useCallback(function doSet() {
  }, []);

  useEffect(function onRemoteData() {
    setRemoteData(data);
  }, [ data ]);

  return {
    doGet,
    doSet,
    error,
    result: remoteData
  };
}

function useGetData() {}

export {
  useRemoteData,
  useGetData
};
