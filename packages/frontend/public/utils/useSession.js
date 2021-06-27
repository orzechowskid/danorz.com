import {
  useRemoteData
} from './useRemoteData.js';

function useSession() {
  /** @type {import('~/t').RemoteResource<import('~/t').Session>} */
  const remoteData = useRemoteData({
    apiEndpoint: `auth/session`
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
    currentUser: data?.name,
    isSignedIn,
    signIn: doCreate,
    signOut: doDelete
  };
}

export {
  useSession
};
