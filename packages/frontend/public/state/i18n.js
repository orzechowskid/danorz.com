import * as types from '../types';

import {
  createSelector
} from 'reselect';

import {
  rawFetch
} from '~/utils/api';

const name = `i18n`;

/** @type {types.I18nState} */
export const initialState = {
  dictionaries: {},
  locale: null,
  supportedLocales: {}
};

/** @type {types.Selector<string>} */
export const selectLocale = createSelector(
  (state) => state[name].locale,
  () => navigator?.language,
  (appLocale, browserLocale) => (appLocale || browserLocale || `en-us`).toLowerCase()
);

/** @type {types.Selector<Object>} */
export const selectSupportedLocales = (state) => state[name].supportedLocales;

/** @type {types.Selector<Object>} */
export const selectDictionaries = (state) => state[name].dictionaries

/** @type {types.Selector<Object>} */
export const selectDictionary = createSelector(
  selectLocale,
  selectDictionaries,
  (locale, dictionaries) => dictionaries[locale]
);

/**
 * @type {types.ActionCreator<types.I18nState>}
 * @param {string} newLocale
 */
export function doSetLocale(appState, newLocale) {
  document.documentElement.lang = newLocale.split(`-`)[0].toLowerCase();

  return {
    i18n: {
      ...appState[name],
      locale: newLocale
    }
  };
}

/** @type {types.ActionCreator<types.I18nState>} */
export async function doSetSupportedLocales(appState) {
  const response = await rawFetch(`i18n/locales`, {
    method: `GET`
  });
  const { locales } = await response.json();

  return {
    i18n: {
      ...appState[name],
      supportedLocales: locales
    }
  }
}

/**
 * @type {types.ActionCreator<types.I18nState>}
 * @param {string} locale
 */
export async function doSetDictionary(appState, locale) {
  const dictionaries = selectDictionaries(appState);

  if (dictionaries[locale.toLowerCase()]) {
    return;
  }

  const response = await rawFetch(`i18n/locales/${locale}/dictionary`, {
    method: `GET`
  });
  const dictionary = await response.json();

  return {
    [name]: {
      ...appState[name],
      dictionaries: {
        ...appState[name].dictionaries,
        [locale.toLowerCase()]: dictionary
      }
    }
  };
}
