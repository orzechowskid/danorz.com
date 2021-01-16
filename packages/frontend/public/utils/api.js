/* eslint-env browser */

const API_PATH = `/api/1`;

/**
 * requests JSON data from API endpoint
 *
 * @param {String} path
 * @return {Promise}
 */
async function getData(path) {
  const response = await window.fetch(`${API_PATH}/${path}`, {
    credentials: `include`
  });

  try {
    return await response.json();
  } catch (ex) {
    return {
      metadata: {
        count: -1,
        error: `unknown error`
      }
    };
  }
}

/*
export async function getChunkedData(path) {
    try {
        const response = await window.fetch(`${API_PATH}/${path}`, {
            credentials: `include`
        });

        return response.json();
    } catch (ex) {
        throw getErrorFromNetworkObject(ex);
    }
}
*/

/**
 * posts JSON data to API endpoint
 *
 * @param {string} path
 * @param {object} [data]
 * @returns {Promise<object>}
 */
async function postData(path, data) {
  const response = await window.fetch(`${API_PATH}/${path}`, {
    body: JSON.stringify(data),
    headers: {
      'Content-Type': `application/json`
    },
    method: `POST`
  });

  try {
    return await response.json();
  } catch (ex) {
    return {
      metadata: {
        count: -1,
        error: `unknown error`
      }
    };
  }
}

/**
 * puts JSON data to API endpoint
 *
 * @param {String} path
 * @param {Object} data
 * @return {Promise<any>}
 */
async function putData(path, data) {
  const response = await window.fetch(`${API_PATH}/${path}`, {
    body: JSON.stringify(data),
    headers: {
      'Content-Type': `application/json`
    },
    method: `PUT`
  });

  try {
    return await response.json();
  } catch (ex) {
    return {
      metadata: {
        count: -1,
        error: `unknown error`
      }
    };
  }
}

/**
 * gets JSON data from API endpoint and returns the fetch object with no processing
 *
 * @param {String} path
 * @return {Promise<Response>}
 */
function rawGetData(path) {
  return window.fetch(`${API_PATH}/${path}`, {
    credentials: `include`
  });
}

/**
 * posts JSON data to API endpoint and returns the fetch object with no processing
 *
 * @param {String} path
 * @param {Object=} data
 * @return {Promise<Response>}
 */
function rawPostData(path, data) {
  let args = {
    credentials: `include`,
    method: `POST`
  };

  if (data) {
    args = {
      ...args,
      body: JSON.stringify(data),
      headers: {
        'Content-Type': `application/json`
      }
    };
  }

  return window.fetch(`${API_PATH}/${path}`, args);
}

export {
  API_PATH as _apiPath,

  getData,
  postData,
  putData,
  rawGetData,
  rawPostData
};
