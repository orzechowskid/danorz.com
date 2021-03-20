import * as types from '~/types.js';

import {
  deleteData,
  getData,
  postData,
  putData
} from '~/utils/api.js';

export const name = `session`;

export const initialState = {
  isSignedIn: undefined,
  name: undefined
};

/** @type {types.Selector<string>} */
export const selectPreferredLocale = (state) => state[name].preferredLocale;

/** @type {types.Selector<boolean>} */
export const selectSignedIn = (state) => state[name].isSignedIn;

/** @type {types.ActionCreator<types.SessionState>} */
export async function doSignIn(appState, username, password) {
  const response = await postData(`auth/session`, {
    name: username,
    password
  });

  console.log({response});
  console.log(response.metadata.error);
  return {
    [name]: {
      ...response.data[0],
      isSignedIn: !response.metadata.error
    }
  };
}

/** @type {types.ActionCreator<"session", types.SessionState>} */
export async function doSignOut() {
  try {
    await deleteData(`auth/session`);

    return {
      [name]: {
        isSignedIn: false
      }
    };
  }
  catch (ex) {
    console.error(ex);
  }
}

/** @type {types.ActionCreator<name, types.SessionState>} */
export async function doGetExistingSession(appState) {
  try {
    const response = await getData(`auth/session`);

    return {
      [name]: {
        ...appState[name],
        isSignedIn: !response.metadata.error
      }
    };
  }
  catch (ex) {
    console.error(ex);
  }
}

/** @type {types.ActionCreator<name, types.SessionState>} */
export async function doSetUserPreferredLocale(appState, newLocale) {
  try {
    const {
      isSignedIn,
      ...currentState
    } = appState[name];
    const response = await putData(`auth/session`, {
      ...currentState,
      preferredLocale: newLocale
    });

    if (!response.metadata.error) {
      return {
        [name]: {
          isSignedIn,
          ...response.data[0]
        }
      };
    }
  }
  catch (ex) {
    console.error(ex);
  }
}
