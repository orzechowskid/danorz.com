import {
  useRemoteData
} from './useRemoteData.js';

/**
 * @typedef {Object} Session
 * @property {string} name
 */

function useSession() {
  /** @type {import('~/t').RemoteResource<Session>} */
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
