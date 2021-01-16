import {
  initialState as bannerState
} from './banner';
import {
  initialState as sessionState
} from './session';

import * as types from '../types';

/** @type {types.AppState} */
export const initialState = {
  banner: bannerState,
  i18n: {
    locale: `en-us`
  },
  session: sessionState
};

/** @type {types.Selector<string> */
export const selectLocale = (state) => state.i18n.locale;

