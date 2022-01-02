const API_PATH = `/api/1`;

/**
 * @param {string} apiEndpoint
 * @param {RequestInit} [opts] - extra `window.fetch` options
 * @return {Promise<Response>}
 */
async function rawFetch(apiEndpoint, opts={}) {
  return window.fetch(`${API_PATH}/${apiEndpoint}`, opts);
}

/**
 * @param {string} apiEndpoint
 * @param {Record<string, any>} [opts]
 */
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
 * @return {Promise<T|import('dto').DtoWrapper<T>>}
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
 * @param {Partial<T>} payload
 * @param {RequestInit} [opts]
 * @returns {Promise<import('dto').DtoWrapper<T>>}
 * @template T
 */
async function postData(apiEndpoint, payload, opts = {}) {
  try {
    const response = await window.fetch(`${API_PATH}/${apiEndpoint}`, {
      body: JSON.stringify(payload),
      method: `POST`,
      ...opts,
      headers: {
        'Content-Type': `application/json`,
        ...(opts.headers ?? {})
      }
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
 * @returns {Promise<import('dto').DtoWrapper<T>>}
 * @throws {Error}
 * @template T
 */
async function putData(apiEndpoint, payload, opts = {}) {
  try {
    const response = await window.fetch(`${API_PATH}/${apiEndpoint}`, {
      body: JSON.stringify(payload),
      method: `PUT`,
      ...opts,
      headers: {
        'Content-Type': `application/json`,
        ...(opts.headers ?? {})
      }
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

export {
  deleteData,
  getData,
  postData,
  putData,
  rawFetch,
  rawRequest
};
