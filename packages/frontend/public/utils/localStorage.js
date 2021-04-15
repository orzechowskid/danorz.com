/**
 * @param {string} path
 * @return {Object}
 */
function getStoredValue(path) {
  if (typeof localStorage === `undefined`) {
    return undefined;
  }

  try {
    return JSON.parse(localStorage.getItem?.(path));
  }
  catch (ex) {
    console.warn(ex);

    return undefined;
  }
}

/**
 * @param {string} path
 * @param {Object} value
 * @return {void}
 */
function setStoredValue(path, value) {
  if (typeof localStorage === `undefined`) {
    return undefined;
  }

  try {
    localStorage.setItem?.(path, JSON.stringify(value));
  }
  catch (ex) {
    console.warn(ex);
  }
}

export {
  getStoredValue,
  setStoredValue
};
