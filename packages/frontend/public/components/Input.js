import * as types from '~/types';

import {
  useCallback,
  useState
} from 'preact/hooks';

function Input(props) {
  const {
    onFocus
  } = props;
  /** @type {types.LocalState<boolean>} */
  const [ touched, setTouched ] = useState(false);
  const preOnFocus = useCallback(function preOnFocus() {
    setTouched(true);
    onFocus?.();
  }, []);

  return (
    <input
      {...props}
      data-input-touched={touched || undefined}
      onFocus={preOnFocus}
    />
  );
}

export default Input;
