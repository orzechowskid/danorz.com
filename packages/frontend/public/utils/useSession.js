import * as types from '~/types.js';

import {
  useRemoteData
} from './useRemoteData.js';

/**
 * @typedef {Object} Session
 * @property {string} name
 * @property {string} _id
 */

/** @typedef {types.RemoteDataSpecialCase<Session, {name: string, password: string}, void, void>} SessionAdapter */

function useSession() {
  /** @type {SessionAdapter} */
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
