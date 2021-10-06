import IntlMessageFormat from 'intl-messageformat';
import {
  useCallback
} from 'preact/hooks';

import {
  useRemoteData
} from '~/utils/useRemoteData.js';

/**
 * @typedef {Object} LocaleData
 * @property {Record<string, string>} locales
 */

/**
 * @typedef {Object} Dictionary
 */

/**
 * @param {string} locale
 * @param {Date} value
 * @param {Object} [args]
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
 * @param {Object} [args]
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
 * @param {Object} [values]
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
 */
function useDictionary(locale) {
  /** @type {import('~/t').RemoteResource<Dictionary>} */
  const {
    data
  } = useRemoteData({
    apiEndpoint: `i18n/locales/${locale}/dictionary`,
    fetchOpts: {
      /* once an hour seems fine? */
      dedupingInterval: 1000 * 60 * 60,
      raw: true
    }
  });

  return data;
}

function useSupportedLocales() {
  /** @type {import('~/t').RemoteResource<LocaleData>} */
  const {
    data
  } = useRemoteData({
    apiEndpoint: `i18n/locales`,
    fetchOpts: {
      raw: true
    }
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
  const date = useCallback(
    /**
     * @param {Date} value
     * @param {Object} args
     */
    (value, args) => datestring(locale, value, args),
    [ locale ]
  );
  const num = useCallback(
    /**
     * @param {number} value
     */
    (value) => number(locale, value),
    [ locale ]
  );
  const t = useCallback(
    /**
     * @param {string} key
     * @param {Record<string, string|number>} [values]
     */
    (key, values) => translate(locale, dictionary, key, values),
    [ locale, dictionary ]
  );
  const time = useCallback(
    /**
     * @param {Date} d
     * @param {Object} args
     */
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
