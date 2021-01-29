import * as types from '~/types';

import {
  useEffect,
  useState
} from 'preact/hooks';

import {
  getData,
  postData
} from '~/utils/api';

/**
 * @param {string} apiEndpoint
 * @return {types.RemoteData<T>?}
 * @template T
 */
function useGetData(apiEndpoint) {
  /** @type {types.LocalState<types.RemoteData<T>>} */
  const [ data, setData ] = useState();

  useEffect(function onMount() {
    async function doGet() {
      /** @type {types.RemoteData<T>} */
      const json = await getData(apiEndpoint);

      setData(json);
    }

    doGet();
  }, [ apiEndpoint ]);

  return data;
}

/**
 * @param {string} apiEndpoint
 * @param {T} payload
 * @return {types.RemoteData<T>?}
 * @template T
 */
function usePostData(apiEndpoint, payload) {
  /** @type {types.LocalState<types.RemoteData<T>>} */
  const [ data, setData ] = useState();

  useEffect(function onMount() {
    async function doPost() {
      /** @type {types.RemoteData<T>} */
      const json = await postData(apiEndpoint, payload);

      setData(json);
    }

    doPost();
  }, [ apiEndpoint, payload ]);

  return data;
}

export {
  useGetData,
  usePostData
};
