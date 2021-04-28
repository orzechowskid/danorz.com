import {
  useRemoteData
} from './useRemoteData.js';

function useSession() {
  const {
    data = {},
    error
  } = useRemoteData({
    apiEndpoint: `auth/session`,
    opts: { raw: true }
  });

  return {
    data,
    error
  };
}

export {
  useSession
};
