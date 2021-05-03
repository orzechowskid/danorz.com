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
    doDelete
  } = remoteData;

  return {
    isSignedIn: !!data,
    signIn: doCreate,
    signOut: doDelete
  };
}

export {
  useSession
};
