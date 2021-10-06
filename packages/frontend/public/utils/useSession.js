import {
  useRemoteData
} from './useRemoteData.js';

/**
 * @typedef {Object} Session
 * @property {string} name
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
  /** @type {boolean|undefined} */
  let isSignedIn;

  if (data === undefined && error === undefined) {
    isSignedIn = undefined;
  }
  else if (error) {
    isSignedIn = false;
  }
  else {
    isSignedIn = !error;
  }

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
