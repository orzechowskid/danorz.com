import * as types from '~/types.js';

import {
  initialState as bannerState
} from './banner.js';
import {
  initialState as i18nState
} from './i18n.js';
import {
  initialState as sessionState,
  name as sessionName
} from './session.js';

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
  [sessionName]: sessionState
};
