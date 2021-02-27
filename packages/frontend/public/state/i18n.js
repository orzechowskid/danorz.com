import * as types from '../types';

import {
  createSelector
} from 'reselect';

import {
  rawGetData
} from '~/utils/api';

/** @type {types.I18nState} */
export const initialState = {
  dictionaries: {},
  locale: null,
  supportedLocales: {}
};

/** @type {types.Selector<string>} */
export const selectLocale = (state) => state.i18n.locale?.toLocaleLowerCase();

/** @type {types.Selector<Object>} */
export const selectSupportedLocales = (state) => state.i18n.supportedLocales;

/** @type {types.Selector<Object>} */
export const selectDictionaries = (state) => state.i18n.dictionaries

/** @type {types.Selector<Object>} */
export const selectDictionary = createSelector(
  selectLocale,
  selectDictionaries,
  (locale, dictionaries) => {
    console.log(dictionaries, locale);
    return dictionaries[locale];
  }
);

/**
 * @type {types.ActionCreator<types.I18nState>}
 * @param {string} newLocale
 */
export function doSetLocale(appState, newLocale) {
  return {
    i18n: {
      ...appState.i18n,
      locale: newLocale
    }
  };
}

/** @type {types.ActionCreator<types.I18nState>} */
export async function doSetSupportedLocales(appState) {
  const response = await rawGetData(`i18n/locales`);
  const { locales } = await response.json();

  return {
    i18n: {
      ...appState.i18n,
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

  if (dictionaries[locale]) {
    return;
  }

  const response = await rawGetData(`i18n/locales/${locale}/dictionary`);
  const dictionary = await response.json();

  return {
    i18n: {
      ...appState.i18n,
      dictionaries: {
        ...appState.i18n.dictionaries,
        [locale]: dictionary
      }
    }
  };
}
