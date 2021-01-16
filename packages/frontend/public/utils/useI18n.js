import IntlMessageFormat from 'intl-messageformat';
import {
  useCallback
} from 'preact/hooks';

import {
  useGlobalState
} from '../state/globalState';
import {
  selectLocale
} from '../state/selectors';

import * as types from '../types';

/**
 * @param {string} locale
 * @param {Date} value
 * @param {object} [args]
 * @returns {string}
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
 * @returns {string}
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
 * @returns {string}
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
 * @param {string} key
 * @param {Object} [values={}]
 * @return {string}
 */
export function translate(locale, key, values = {}) {
  const str = `${locale}:${key}`;

  return new IntlMessageFormat(str, locale).format(values);
}

/**
 * @typedef {Object} I18nFunctions
 * @property {(value:number, [args]:Object) => string} date
 * @property {(value:number) => string} num
 * @property {(key:string, [values]:Object) => string} t
 * @property {(date:Date, [args]:Object) => string} time
 */

/**
 * @return {I18nFunctions}
 */
function useI18n() {
  const [{
    locale
  }] = useGlobalState({
    locale: selectLocale
  });
  const date = useCallback(
    (...args) => datestring(locale, ...args),
    [ locale ]
  );
  const num = useCallback(
    (...args) => number(locale, ...args),
    [ locale ]
  );
  const t = useCallback(
    (...args) => translate(locale, ...args),
    [ locale ]
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
  useI18n
};
