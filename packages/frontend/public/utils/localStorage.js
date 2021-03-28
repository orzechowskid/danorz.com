/**
 * @param {string} path
 * @return {Object}
 */
function getStoredValue(path) {
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
