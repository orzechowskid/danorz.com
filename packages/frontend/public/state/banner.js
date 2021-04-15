import {
  createSelector
} from 'reselect';

import * as types from '~/types.js';

import {
  getStoredValue
} from '~/utils/localStorage.js';

export const initialState = {};

/** @type {types.Selector<boolean>} */
export const selectBannerDismissable = (state) => state.banner.dismissable;

/** @type {types.Selector<types.Severity>} */
export const selectBannerSeverity = (state) => state.banner.severity;

/** @type {types.Selector<string>} */
export const selectBannerText = (state) => state.banner.text;

/** @type {types.Selector<string[]> */
export const selectDismissedBanners = () => getStoredValue(`dismissedBanners`) || [];

/** @type {types.Selector<string>} */
export const selectBannerId = (state) => state.banner.id;

/** @type {types.Selector<boolean> */
export const selectHasDismissedBanner = createSelector(
  selectBannerId,
  selectDismissedBanners,
  (bannerId, dismissedBanners) => dismissedBanners.includes(bannerId)
);
