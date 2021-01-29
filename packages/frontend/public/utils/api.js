import * as types from '~/types';

const API_HOST = process.env.API_URL;
const API_PATH = `api/1`;

/** @typedef {'GET'|'POST'|'PUT'} HttpMethod */

/**
 * @param {string} apiEndpoint
 * @param {HttpMethod} method
 * @param {T} [payload]
 * @param {Object} [opts] - extra `window.fetch` options
 * @return {Promise<types.RemoteData<T>>}
 * @template T
 */
async function doFetch(apiEndpoint, method, payload, opts={}) {
  try {
    const response = await window.fetch(`${API_HOST}/${API_PATH}/${apiEndpoint}`, {
      body: payload,
      method,
      ...opts
    });
    const json = await response.json();

    return json;
  } catch (ex) {
    return {
      data: [],
      metadata: {
        count: -1,
        error: ex.message
      }
    };
  }
}

/**
 * @param {string} apiEndpoint
 * @param {HttpMethod} method
 * @param {Object} [opts] - extra `window.fetch` options
 * @return {Promise<Response>}
 */
async function doRawFetch(apiEndpoint, method, opts={}) {
  return window.fetch(`${API_HOST}/${API_PATH}/${apiEndpoint}`, {
    method,
    ...opts
  });
}

/**
 * fetches JSON data from API endpoint
 *
 * @param {string} apiEndpoint
 * @return {Promise<types.RemoteData<T>>}
 * @template T
 */
async function getData(apiEndpoint) {
  return doFetch(apiEndpoint, `GET`);
}

/**
 * posts JSON data to API endpoint
 *
 * @param {string} apiEndpoint
 * @param {T} payload
 * @returns {Promise<types.RemoteData<T>>}
 * @template T
 */
async function postData(apiEndpoint, payload) {
  return doFetch(apiEndpoint, `POST`, payload, {
    headers: {
      'Content-Type': `application/json`
    }
  });
}

/**
 * puts JSON data to API endpoint
 *
 * @param {String} apiEndpoint
 * @param {T} payload
 * @return {Promise<types.RemoteData<T>>}
 * @template T
 */
async function putData(apiEndpoint, payload) {
  return doFetch(apiEndpoint, `PUT`, payload, {
    headers: {
      'Content-Type': `application/json`
    }
  });
}

/**
 * requests data from API endpoint and returns the fetch object with no processing
 *
 * @param {String} apiEndpoint
 * @param {Object} [opts] - extra `window.fetch` options
 * @return {Promise<Response>}
 */
function rawGetData(apiEndpoint, opts={}) {
  return doRawFetch(apiEndpoint, `GET`, opts);
}

/**
 * writes data to API endpoint and returns the fetch object with no processing
 *
 * @param {String} apiEndpoint
 * @param {Object} payload
 * @param {Object} [opts] - extra `window.fetch` options
 * @return {Promise<Response>}
 */
function rawPostData(apiEndpoint, payload, opts={}) {
  return doRawFetch(apiEndpoint, `POST`, payload, {
    headers: {
      'Content-Type': `application/json`
    },
    ...opts
  });
}

export {
  getData,
  postData,
  putData,
  rawGetData,
  rawPostData
};
