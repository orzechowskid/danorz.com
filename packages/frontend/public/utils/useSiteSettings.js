import _get from 'lodash/get';
import _set from 'lodash/set';
import {
  useGlobalToast
} from './useGlobalToast.js';
import {
  useRemoteObject
} from './useRemoteData.js';

/**
 * @typedef UpdateSiteSettings
 * @property {string} path
 * @property {boolean|number|string} value
 */

function useSiteSettings() {
  /** @type {import('~/t').RemoteObject<import('dto').SiteSettings, never, UpdateSiteSettings>} */
  const {
    data,
    put
  } = useRemoteObject(`env/settings`, {
    raw: true,
    putOpts: {
      method: `PATCH`
    }
  });
  const {
    toast
  } = useGlobalToast();

  /**
   * @param {string} path
   */
  function getSetting(path) {
    return _get(data?.values ?? {}, path)?.value;
  }

  /**
   * @param {string} path
   * @param {any} value
   */
  function updateSetting(path, value) {
    if (!data?.values) {
      toast({
        message: `setting at ${path} could not be set`,
        severity: `warn`
      });

      return;
    }

    _set(data.values, path, {
      ..._get(data.values, path),
      value
    });

    put({
      path,
      value
    });
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
