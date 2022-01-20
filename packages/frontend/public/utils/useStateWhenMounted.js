import {
  useCallback,
  useEffect,
  useRef,
  useState
} from 'preact/hooks';

/**
 * @param {T} initialValue
 * @returns {import('~/t').LocalState<T>}
 * @template T
 */
function useStateWhenMounted(initialValue) {
  const [ value, setValue ] = useState(initialValue);
  const mountedRef = useRef(false);
  const setValueIfMounted = useCallback(
    /** @param {T|((old: T) => T)} nextVal */
    function setValueIfMounted(nextVal) {
      if (!mountedRef.current) {
        /* eslint-disable-next-line no-console */
        console.debug('ignoring state-set request for unmounted component');
      }
      else {
        setValue(nextVal);
      }
    },
    []
  );

  useEffect(function onMount() {
    mountedRef.current = true;

    return function onUnmount() {
      mountedRef.current = false;
    };
  }, []);

  return [ value, setValueIfMounted ];
}

export {
  useStateWhenMounted
};
