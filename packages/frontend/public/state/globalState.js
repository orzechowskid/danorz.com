import * as types from '~/types';

import {
  initialState as bannerState
} from './banner';
import {
  initialState as i18nState
} from './i18n';
import {
  initialState as sessionState
} from './session';

/** @type {types.AppInfoState} */
const appInfoState = {
  clientVersion: `1.0.0`,
  serverVersion: `1.0.0`
};

/** @type {types.Selector<string>} */
export const selectAppClientVersion = (appState) => appState.appInfo.clientVersion;

/** @type {types.Selector<string>} */
export const selectAppServerVersion = (appState) => appState.appInfo.serverVersion;

/** @type {types.AppState} */
export const initialState = {
  appInfo: appInfoState,
  banner: bannerState,
  i18n: i18nState,
  session: sessionState
};
