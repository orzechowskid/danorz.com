import {
  useEffect,
  useState
} from 'preact/hooks';

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
  /** @type {import('~/t').RemoteObject<Session, SignInShape>} */
  const {
    busy,
    data,
    del,
    post
  } = useRemoteObject(`auth/session`, {
    ttl: 1000  * 86400
  });

  return {
    busy,
    currentUser: data?.name,
    isSignedIn: data?.isLoggedIn,
    signIn: post,
    signOut: del
  };
}

export {
  useSession
};
