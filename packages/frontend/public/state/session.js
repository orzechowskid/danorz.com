import * as types from '../types';

export const initialState = {
  isSignedIn: true
};

/** @type {types.Selector<boolean>} */
export const selectSignedIn = (state) => state.session.isSignedIn;
