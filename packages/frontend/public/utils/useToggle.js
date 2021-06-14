import {
  useCallback,
  useState
} from 'preact/hooks';

/**
 * @typedef {[T, import('preact/hooks').StateUpdater<T>]} LocalState
 * @template T
 */

/** @typedef {() => void} EnableFunction */
/** @typedef {() => void} DisableFunction */
/** @typedef {() => void} ToggleFunction */

/**
 * @typedef {Object} UseToggleData
 * @property {DisableFunction} disable
 * @property {EnableFunction} enable
 * @property {boolean} on
 * @property {ToggleFunction} toggle
 */

/**
 * @param {boolean} initialState
 * @return {UseToggleData}
 */
function useToggle(initialState) {
  /** @type {LocalState<boolean>} */
  const [ on, setOn ] = useState(initialState);
  const enable = useCallback(function() {
    setOn(true);
  }, []);
  const disable = useCallback(function() {
    setOn(false);
  }, []);
  const toggle = useCallback(function() {
    setOn((o) => !o);
  }, []);

  return {
    disable,
    enable,
    on,
    toggle
  };
}

export {
  useToggle
};
