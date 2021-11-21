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
 * @param {any} obj
 * @param {string} path
 * @param {any} val
 * @return {void}
 */
function set(obj, path, val) {
  const pos = path.lastIndexOf(`.`);
  const parent = get(obj, path.slice(0, pos));

  parent[path.slice(pos + 1)] = val;
}

export {
  get,
  set
};
