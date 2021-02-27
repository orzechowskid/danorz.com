/**
 * @param {String} locale
 * @return {Promise<Object>}
 */
export function getTranslations(locale) {
  switch (locale) {
    /* dynamic imports won't get code-split out */
    case `en-US`:
      return import('./en-US.json');
    case `es-ES`:
      return import('./es-ES.json');
    default:
      return Promise.reject(new Error(`can't fetch translations for unsupported locale ${locale}`));
  }
}
