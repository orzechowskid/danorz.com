import IntlMessageFormat from 'intl-messageformat';
import {
  useCallback
} from 'preact/hooks';

import {
  useRemoteObject
} from '~/utils/useRemoteData.js';

/**
 * @typedef {Object} LocaleData
 * @property {Record<string, string>} locales
 */

/**
 * @typedef Dictionary
 * @property {string} locale
 */

/**
 * @param {string} locale
 * @param {Date} value
 * @param {Object} [args]
 * @param {string} [args.type]
 * @return {string}
 */
export function datestring(locale, value, args = {}) {
  const {
    type = `short`
  } = args;
  const str = new IntlMessageFormat(`{x, date, ${type}}`, locale).format({
    x: value
  });

  return /** @type {string} */(str);
}

/**
 * Format the given number according to the rules of the given locale
 * @param {string} locale
 * @param {number} value
 * @return {string}
 */
function number(locale, value) {
  const str = new IntlMessageFormat(`{x, number}`, locale).format({
    x: value
  });

  return /** @type {string} */(str);
}

/**
 * @param {string} locale
 * @param {Date} value
 * @param {Object} [args]
 * @param {string} [args.type]
 * @return {string}
 */
function timestamp(locale, value, args = {}) {
  const {
    type = `short`
  } = args;
  const str = new IntlMessageFormat(`{x, time, ${type}}`, locale).format({
    x: value
  });

  return /** @type {string} */(str);
}

/**
 * @param {string} locale
 * @param {Record<string, any>} dictionary
 * @param {string} key
 * @param {Record<string, string>} [values]
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
  const entry = dictionary[namespace]?.[realKey];

  if (!entry) {
    console.warn(`no entry in ${locale} dictionary found for ${namespace || '<undefined>'}:${realKey || '<undefined>'}`);

    return key;
  }

  try {
    const str = new IntlMessageFormat(entry, locale).format(values);

    return /** @type {string} */(str);
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
  /** @type {import('~/t').RemoteObject<Dictionary>} */
  const {
    data
  } = useRemoteObject(`i18n/locales/${locale}/dictionary`, {
    getOpts: {
      rawResponse: true
    },
    ttl: 1000 * 86400
  });

  return data;
}

function useSupportedLocales() {
  /** @type {import('~/t').RemoteObject<LocaleData>} */
  const {
    data
  } = useRemoteObject(`i18n/locales`);

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
     * @param {Object} [args]
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
