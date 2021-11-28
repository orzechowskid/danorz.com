/**
 * @param {any} obj
 * @param {string} path
 * @return {any}
 */
function get(obj, path) {
  return path?.split(`.`)
    .reduce(
      (acc, token) => acc?.[token],
      obj
    );
}

/**
 * @param {Record<string, any>} obj
 * @param {string} path
 */
function clonePath(obj, path) {
  const p = path.split(`.`);
  /**
   * @param {Object} o
   * @param {number} [i]
   * @return {Record<string, any>}
   */
  const f = (o, i = 0) => ({
    ...o,
    [p[i]]: f(o[p[i]] ?? {})
  })

  return f(obj);
}

/**
 * @param {Record<string, any>} obj
 * @param {string} path
 * @param {any} val
 * @return {Object}
 */
function set(obj, path, val) {
  const pos = path.lastIndexOf(`.`);
  const parentPath = path.slice(0, pos);
  const newObj = clonePath(obj, parentPath);
  const parentObj = get(newObj, parentPath);

  parentObj[path.slice(pos + 1)] = val;

  return newObj;
}

export {
  get,
  set
};
