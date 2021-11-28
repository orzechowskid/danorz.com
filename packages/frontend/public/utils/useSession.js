import {
  useRemoteData
} from './useRemoteData.js';

/**
 * @typedef {Object} Session
 * @property {boolean} isLoggedIn
 */

/**
 * @typedef {Object} SignInShape
 * @property {string} name
 * @property {string} password
 */

function useSession() {
  /** @type {import('~/t').RemoteResource<Session, SignInShape>} */
  const remoteData = useRemoteData({
    apiEndpoint: `auth/session`,
    fetchOpts: {
      raw: true
    }
  });
  const {
    data,
    doCreate,
    doDelete,
    error
  } = remoteData;
  let isSignedIn;

  isSignedIn = !!error
    ? false
    : data?.isLoggedIn;

  return {
    currentUser: data?.name,
    isSignedIn,
    signIn: doCreate.execute,
    signOut: doDelete.execute
  };
}

export {
  useSession
};
