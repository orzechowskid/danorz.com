import * as types from '~/types.js';

const API_PATH = `/api/1`;

/**
 * @param {string} apiEndpoint
 * @param {RequestInit} [opts] - extra `window.fetch` options
 * @return {Promise<Response>}
 */
async function rawFetch(apiEndpoint, opts={}) {
  return window.fetch(`${API_PATH}/${apiEndpoint}`, opts);
}

async function rawRequest(apiEndpoint, opts = {}) {
  try {
    const response = await rawFetch(apiEndpoint, opts);

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response.json();
  }
  catch (ex) {
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
 * fetches JSON data from API endpoint
 *
 * @param {string} apiEndpoint
 * @param {Object} [opts]
 * @return {Promise<types.RemoteData<T>>}
 * @template T
 */
async function getData(apiEndpoint, opts = {}) {
  try {
    const response = await window.fetch(`${API_PATH}/${apiEndpoint}`, {
      method: `GET`,
      ...opts
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response.json();
  }
  catch (ex) {
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
 * posts JSON data to API endpoint
 *
 * @param {string} apiEndpoint
 * @param {T} payload
 * @param {RequestInit} [opts]
 * @returns {Promise<types.RemoteData<T>>}
 * @template T
 */
async function postData(apiEndpoint, payload, opts = {}) {
  try {
    const response = await window.fetch(`${API_PATH}/${apiEndpoint}`, {
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': `application/json`
      },
      method: `POST`,
      ...opts
    });
    const json = await response.json();

    return json;
  }
  catch (ex) {
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
 * puts JSON data to API endpoint
 *
 * @param {String} apiEndpoint
 * @param {T} payload
 * @param {RequestInit} [opts]
 * @return {Promise<types.RemoteData<T>>}
 * @template T
 */
async function putData(apiEndpoint, payload, opts = {}) {
  try {
    const response = await window.fetch(`${API_PATH}/${apiEndpoint}`, {
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': `application/json`
      },
      method: `PUT`,
      ...opts
    });
    const json = await response.json();

    return json;
  }
  catch (ex) {
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
 * @return {Promise<void>}
 */
async function deleteData(apiEndpoint) {
  return window.fetch(`${API_PATH}/${apiEndpoint}`, {
    method: `DELETE`
  });
}

/**
 * @param {T|T[]} data
 * @param {types.RemoteData<T>} apiResponse
 * @return {types.RemoteData<T>}
 * @template T
 */
function wrap(data, apiResponse) {
  return {
    ...apiResponse,
    data: !!data.length && typeof data !== `string` ? data : [ data ]
  };
}

/**
 * @param {types.RemoteData<T>} apiResponse
 * @return {string|T[]|T}
 * @template T
 */
function unwrap(apiResponse) {
  if (!apiResponse) {
    return undefined;
  }

  const {
    data,
    metadata
  } = apiResponse;

  if (!metadata) {
    return undefined;
  }

  if (metadata.error) {
    return metadata.error;
  }

  return metadata.total === 1
    ? data[0]
    : data;
}

export {
  deleteData,
  getData,
  postData,
  putData,
  rawFetch,
  rawRequest,
  unwrap,
  wrap
};
