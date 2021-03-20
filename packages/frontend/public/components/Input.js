import * as types from '~/types.js';

import {
  useCallback,
  useState
} from 'preact/hooks';

import RadioButton from './inputs/RadioButton.js';

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
  const inputProps = {
    ...props,
    'data-input-touched': touched || undefined,
    onFocus: preOnFocus
  }

  switch (props.type) {
    case `radio`: {
      return (
        <RadioButton {...props} />
      );
    }
    default: {
      return (
        <input {...inputProps} />
      );
    }
  }
}

export default Input;
