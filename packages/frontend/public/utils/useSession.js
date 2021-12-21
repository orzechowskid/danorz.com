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
    busy,
    data,
    del,
    post
  } = useRemoteObject(`auth/session`);

  const isSignedIn = busy
    ? undefined
    : data?.isLoggedIn ?? false;

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
