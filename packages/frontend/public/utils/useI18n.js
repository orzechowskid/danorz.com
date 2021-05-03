import IntlMessageFormat from 'intl-messageformat';
import {
  useCallback
} from 'preact/hooks';

import {
  useRemoteData
} from '~/utils/useRemoteData.js';

/**
 * @param {string} locale
 * @param {Date} value
 * @param {Record<string, any>} [args]
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
 * @param {Record<string, any>} [args]
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
 * @param {Record<string, any>} dictionary
 * @param {string} key
 * @param {Record<string, any>} [values={}]
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
 * @param {string} locale
 * @return {Record<string, any>}
 */
function useDictionary(locale) {
  const {
    data
  } = useRemoteData({
    apiEndpoint: () => locale ? `i18n/locales/${locale}/dictionary` : null,
    opts: {
      /* once an hour seems fine? */
      dedupingInterval: 1000 * 60 * 60,
      raw: true
    }
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
  return {
    locale: `en-us`,
    setLocale() {}
  };
}

function useI18n() {
  const {
    locale
  } = useLocale();
  const dictionary = useDictionary(locale);
  /** @type {(value: Date, args?: Record<string, any>) => string} */
  const date = useCallback(
    (value, args) => datestring(locale, value, args),
    [ locale ]
  );
  /** @type {(value: number) => string} */
  const num = useCallback(
    (value) => number(locale, value),
    [ locale ]
  );
  /** @type {(key: string, values?: Record<string, any>) => string} */
  const t = useCallback(
    (key, values) => translate(locale, dictionary, key, values),
    [ locale, dictionary ]
  );
  /** @type {(d: Date, args?: Record<string, any>) => string} */
  const time = useCallback(
    (d, args) => timestamp(locale, d, args),
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
