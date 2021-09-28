import {
  useRemoteData
} from './useRemoteData.js';

function useSession() {
  /** @type {import('~/t').RemoteResource<import('~/t').Session>} */
  const remoteData = useRemoteData({
    apiEndpoint: `auth/session`
  });
  const {
    create,
    del,
    get
  } = remoteData;
  const {
    data,
    error
  } = get;
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
    signIn: create.execute,
    signOut: del.execute
  };
}

export {
  useSession
};
