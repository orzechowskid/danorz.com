import * as types from '~/types';

export const initialState = {
  isSignedIn: false,
  username: undefined
};

/** @type {types.Selector<boolean>} */
export const selectSignedIn = (state) => state.session.isSignedIn;

/** @type {types.ActionCreator<types.SessionState>} */
export async function doSignIn(appState, username, password) {
  console.log({username,password});

  return new Promise(function(resolve) {
    setTimeout(function() {
      resolve({
        session: {
          ...appState.session,
          isSignedIn: true,
          username
        }
      });
    }, 2500);
  });
}
