import {
  get,
  set
} from './getSet.js';
import {
  useGlobalToast
} from './useGlobalToast.js';
import {
  useRemoteObject
} from './useRemoteData.js';

function useSiteSettings() {
  /** @type {import('~/t').RemoteObject<import('dto').Settings>} */
  const {
    data,
    put
  } = useRemoteObject(`env/settings`, {
    raw: true
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

    put({
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
