import {
  deleteData,
  getData,
  postData,
  putData
} from '~/utils/api.js';
import {
  read as readFromLocalStorage,
  write as writeToLocalStorage
} from '~/utils/useLocalStorage.js';

export const name = `session`;

/** @type {import('~/t').SessionState} */
export const initialState = {
  isSignedIn: undefined,
  name: undefined,
  preferredLocale: readFromLocalStorage(`session.preferredLocale`) || `en-US`
};

/** @type {import('~/t').Selector<string>} */
export const selectPreferredLocale = (state) => state[name].preferredLocale;

/** @type {import('~/t').Selector<boolean>} */
export const selectSignedIn = (state) => state[name].isSignedIn;

/** @type {import('~/t').ActionCreator<import('~/t').SessionState>} */
export async function doSignIn(appState, username, password) {
  const response = await postData(`auth/session`, {
    name: username,
    password
  });

  return {
    [name]: {
      ...response.data[0],
      isSignedIn: !response.metadata.error
    }
  };
}

/** @type {import('~/t').ActionCreator<"session", import('~/t').SessionState>} */
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

/** @type {import('~/t').ActionCreator<name, import('~/t').SessionState>} */
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

/** @type {import('~/t').ActionCreator<name, import('~/t').SessionState>} */
export async function doSetUserPreferredLocale(appState, newLocale) {
  try {
    const {
      isSignedIn,
      ...currentState
    } = appState[name];

    writeToLocalStorage(`session.preferredLocale`, newLocale);

    if (!isSignedIn) {
      return;
    }

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
