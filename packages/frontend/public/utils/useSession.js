import {
  useRemoteData
} from './useRemoteData.js';

function useSession() {
  /** @type {Session} */
  const remoteData = useRemoteData({
    apiEndpoint: `auth/session`,
    opts: { raw: true }
  });
  const {
    data,
    doCreate,
    doDelete,
    error
  } = remoteData;
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
    isSignedIn,
    signIn: doCreate,
    signOut: doDelete
  };
}

export {
  useSession
};
