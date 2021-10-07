import _get from 'lodash/get';
import _set from 'lodash/set';

import {
  useRemoteData
} from '~/utils/useRemoteData.js';

/**
 * @typedef {Object} Settings
 * @property {string} name
 * @property {Object} values
 */

function useSiteSettings() {
  /** @type {import('~/t').RemoteResource<Settings>} */
  const {
    data,
    error,
    doUpdate
  } = useRemoteData({
    apiEndpoint: `env/settings`,
    fetchOpts: {
      raw: true
    }
  });

  /**
   * @param {string} path
   */
  function getSetting(path) {
    return _get(data?.values ?? {}, path);
  }

  /**
   * @param {string} path
   * @param {any} value
   */
  function updateSetting(path, value) {
    if (!data?.values) {
      console.warn(`setting at ${path} could not be set`);

      return;
    }

    /* `lodash.set` mutates in place so we shallow-clone here */
    const nextData = {
      ...data,
      values: _set({
        ...data.values
      }, path, value)
    };
    doUpdate.execute(nextData);
  }

  return {
    data,
    getSetting,
    updateSetting
  };
}

export {
  useSiteSettings
};
