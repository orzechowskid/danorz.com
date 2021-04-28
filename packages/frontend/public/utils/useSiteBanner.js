import * as types from '~/types.js';

import {
  useLocalStorage
} from './localStorage.js';
import {
  useRemoteData
} from './useRemoteData.js';

function useSiteBanner() {
  const {
    getStoredValue,
    setStoredValue
  } = useLocalStorage();
  const {
    data,
    error
  } = useRemoteData({
    apiEndpoint: `site/banner`
  });

  function dismissBanner() {
  }

  return {
    data,
    dismissBanner,
    error
  };
}

export {
  useSiteBanner
};
