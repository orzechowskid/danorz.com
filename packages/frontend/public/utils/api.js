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
  const response = await rawFetch(apiEndpoint, opts);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
}

/**
 * fetches JSON data from API endpoint
 *
 * @param {string} apiEndpoint
 * @param {Object} [opts]
 * @return {Promise<import('~/t').RemoteData<T>>}
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
 * @returns {Promise<import('~/t').RemoteData<T>>}
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
 * @returns {Promise<import('~/t').RemoteData<T>>}
 * @throws {Error}
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
    // TODO: analytics
    throw new Error(ex.message);
  }
}

/**
 * @description deletes JSON data at API endpoint
 *
 * @param {String} apiEndpoint
 * @param {RequestInit} [opts]
 * @return {Promise<void>}
 * @throws {Error}
 */
async function deleteData(apiEndpoint, opts = {}) {
  await window.fetch(`${API_PATH}/${apiEndpoint}`, {
    method: `DELETE`,
    ...opts
  });
}

/**
 * @param {T|T[]} data
 * @param {import('~/t').RemoteData<T>} apiResponse
 * @return {import('~/t').RemoteData<T>}
 * @template T
 */
function wrap(data, apiResponse) {
  return {
    ...apiResponse,
    data: !!data.length && typeof data !== `string` ? data : [ data ]
  };
}

/**
 * @param {import('~/t').RemoteData<T>} apiResponse
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
  //  unwrap,
  wrap
};
