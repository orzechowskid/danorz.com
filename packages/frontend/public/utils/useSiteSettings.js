import {
  get,
  set
} from './getSet.js';
import {
  useGlobalToast
} from './useGlobalToast.js';
import {
  useRemoteData
} from './useRemoteData.js';

function useSiteSettings() {
  /** @type {import('~/t').RemoteResource<import('dto').Settings>} */
  const {
    data,
    doUpdate
  } = useRemoteData({
    apiEndpoint: `env/settings`,
    fetchOpts: {
      raw: true
    }
  });
  const {
    toast
  } = useGlobalToast();

  /**
   * @param {string} path
   */
  function getSetting(path) {
    return get(data?.values ?? {}, path);
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

    doUpdate.execute({
      ...data,
      values: set(data.values, path, value)
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
