import Md5 from 'blueimp-md5';

/**
 * @param {string} email
 * @return {string}
 */
function emailAddressToGravatarHash(email) {
  console.log(Md5(email.trim().toLowerCase()));
  return Md5(email.trim().toLowerCase());
}

/**
 * @param {string} hash
 * @param {number} [size=80]
 * @return {string}
 */
function gravatarHashToUrl(hash, size = 80) {
  return `//www.gravatar.com/avatar/${hash}?s=${size}`;
}

/**
 * @param {Object.<string, T>} obj
 * @param {(val: T) => any} mapFn
 * @return {Object.<string, T>}
 * @template T
 */
function mapObjectValues(obj, mapFn) {
  return Object.entries(obj).reduce(
    (acc, [ k, v ]) => ({ ...acc, [k]: mapFn(v) }), {}
  );
}

/**
 * @param {HTMLFormElement} formEl
 * @return {Object.<string,string>}
 */
function getFormData(formEl) {
  const formData = new FormData(formEl);

  return [ ...formData.entries() ].reduce(
    (acc, [ k, v ]) => ({ ...acc, [k]: v }),
    {}
  );
}

export {
  emailAddressToGravatarHash,
  getFormData,
  gravatarHashToUrl,
  mapObjectValues
};
