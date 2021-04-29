import IntlMessageFormat from 'intl-messageformat';
import {
  useCallback
} from 'preact/hooks';

import * as types from '~/types.js';

import {
  useRemoteData
} from '~/utils/useRemoteData.js';

/**
 * @param {string} locale
 * @param {Date} value
 * @param {object} [args]
 * @return {string}
 */
export function datestring(locale, value, args = {}) {
  const {
    type = `short`
  } = args;

  return new IntlMessageFormat(`{x, date, ${type}}`, locale).format({
    x: value
  });
}

/**
 * Format the given number according to the rules of the given locale
 * @param {string} locale
 * @param {number} value
 * @return {string}
 */
function number(locale, value) {
  return new IntlMessageFormat(`{x, number}`, locale).format({
    x: value
  });
}

/**
 * @param {string} locale
 * @param {Date} value
 * @param {object} [args]
 * @return {string}
 */
function timestamp(locale, value, args = {}) {
  const {
    type = `short`
  } = args;

  return new IntlMessageFormat(`{x, time, ${type}}`, locale).format({
    x: value
  });
}

/**
 * @param {string} locale
 * @param {Object} dictionary
 * @param {string} key
 * @param {Object} [values={}]
 * @return {string}
 */
export function translate(locale, dictionary, key, values = {}) {
  if (!dictionary) {
    return ``;
  }

  const [
    namespace,
    realKey
  ] = key.split(`:`);
  const str = dictionary[namespace]?.[realKey];

  if (!str) {
    console.warn(`no entry in ${locale} dictionary found for ${namespace || '<undefined>'}:${realKey || '<undefined>'}`);

    return key;
  }

  try {
    return new IntlMessageFormat(str, locale).format(values);
  }
  catch (ex) {
    console.warn(ex);

    return key;
  }
}

/**
 * @typedef {Object} I18nFunctions
 * @property {(value:number, [args]:Object) => string} date
 * @property {(value:number) => string} num
 * @property {(key:string, [values]:Object) => string} t
 * @property {(date:Date, [args]:Object) => string} time
 */

function useDictionary(locale) {
  const {
    data
  } = useRemoteData({
    apiEndpoint: () => locale ? `i18n/locales/${locale}/dictionary` : null,
    opts: { raw: true }
  });

  return data;
}

function useSupportedLocales() {
  const {
    data
  } = useRemoteData({
    apiEndpoint: `i18n/locales`,
    opts: { raw: true }
  });

  return data?.locales ?? {};
}

function useLocale() {
  // TODO: preferences, local storage, etc
  return `en-us`;
}

/**
 * @return {I18nFunctions}
 */
function useI18n() {
  const locale = useLocale();
  const dictionary = useDictionary(locale);
  const date = useCallback(
    (...args) => datestring(locale, ...args),
    [ locale ]
  );
  const num = useCallback(
    (...args) => number(locale, ...args),
    [ locale ]
  );
  const t = useCallback(
    (...args) => translate(locale, dictionary, ...args),
    [ locale, dictionary ]
  );
  const time = useCallback(
    (...args) => timestamp(locale, ...args),
    [ locale ]
  );

  return {
    date,
    num,
    t,
    time
  };
}

export {
  useDictionary,
  useI18n,
  useLocale,
  useSupportedLocales
};
