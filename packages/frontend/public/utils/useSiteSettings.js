import _get from 'lodash/get';
import _set from 'lodash/set';

import {
  useRemoteData
} from '~/utils/useRemoteData.js';

/**
 * @param {{ raw: boolean }} [opts]
 */
function useSiteSettings(opts = {}) {
  const {
    raw = false
  } = opts;
  const {
    data,
    error,
    doUpdate
  } = useRemoteData({
    apiEndpoint: `env/settings`,
    opts: {
      raw: true
    }
  });

  function getSetting(path) {
    return _get(data?.values ?? {}, path);
  }

  function updateSetting(path, value) {
    if (!data?.values) {
      console.warn(`setting at ${path} could not be set`);

      return;
    }

    /* `lodash.set` mutates in place so we shallow-clone here */
    const nextData = {
      ...data,
      values: _set({ ...data.values }, path, value)
    };
    doUpdate(nextData);
  }

  return {
    data: raw ? data : undefined,
    getSetting,
    updateSetting
  };
}

export {
  useSiteSettings
};
