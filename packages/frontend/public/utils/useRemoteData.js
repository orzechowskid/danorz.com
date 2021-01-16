import {
  useEffect,
  useState
} from 'preact/hooks';

import * as types from '../types';

const API_ROOT = `api/1`;

/**
 * @param {string} apiEndpoint
 * @return {types.RemoteData<T>}
 * @template T
 */
function useRemoteData(apiEndpoint) {
  /** @type {types.LocalState<T[]>} */
  const [ data, setData ] = useState();

  useEffect(function() {
    async function doFetch() {
      const response = await window.fetch(`${process.env.API_URL}/${API_ROOT}/${apiEndpoint}`);
      /** @type {T[]} */
      const json = await response.json();

      setData(json);
    }

    doFetch();
  }, []);

  return data;
}

export {
  useRemoteData
};
