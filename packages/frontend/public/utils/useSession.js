import {
  useRemoteObject
} from './useRemoteData.js';

/**
 * @typedef Session
 * @property {boolean} isLoggedIn
 * @property {string} [name]
 */

/**
 * @typedef SignInShape
 * @property {string} name
 * @property {string} password
 */

function useSession() {
  /** @type {import('~/t').RemoteObject<Session>} */
  const {
    data,
    del,
    post
  } = useRemoteObject(`auth/session`, {
    raw: true
  });
  const isSignedIn = data?.isLoggedIn;

  return {
    currentUser: data?.name,
    isSignedIn,
    signIn: post,
    signOut: del
  };
}

export {
  useSession
};
