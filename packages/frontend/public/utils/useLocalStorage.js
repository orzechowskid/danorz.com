import {
  useCallback,
  useEffect,
  useState
} from 'preact/hooks';

/**
 * @param {string} path
 * @return {Object}
 */
function read(path) {
  if (typeof localStorage === `undefined`) {
    return undefined;
  }

  try {
    return JSON.parse(localStorage.getItem?.(path) ?? `null`);
  }
  catch (ex) {
    console.warn(ex);

    return undefined;
  }
}

/**
 * @param {string} path
 * @param {Object} value
 * @return {void}
 */
function write(path, value) {
  if (typeof localStorage === `undefined`) {
    return undefined;
  }

  try {
    localStorage.setItem?.(path, JSON.stringify(value));
  }
  catch (ex) {
    console.warn(ex);
  }
}

/**
 * @param {string} path
 */
function useLocalStorage(path) {
  /** @type {LocalState<any>} */
  const [ data, setData ] = useState(read(path));
  /** @type {(nextValue: any) => void} */
  const update = useCallback(function update(nextValue) {
    try {
      write(path, nextValue);
      setData(nextValue);
    }
    catch (ex) {
      console.warn(ex.message);
    }
  }, [ path ]);

  useEffect(function listen() {
    /**
     * @param {StorageEvent} e
     */
    function onStorageChange(e) {
      const {
        key,
        newValue,
        storageArea
      } = e;

      if (storageArea !== window.localStorage) {
        return;
      }

      if (key === null) {
        /* storage was cleared */
        setData(null);
      }
      else if (key === path) {
        setData(newValue);
      }
    }

    window?.addEventListener(`storage`, onStorageChange);

    return function cleanup() {
      window?.removeEventListener(`storage`, onStorageChange);
    }
  }, []);

  return {
    data,
    update
  }
}

export {
  useLocalStorage
};
