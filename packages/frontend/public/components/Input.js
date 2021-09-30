import {
  useCallback,
  useState
} from 'preact/hooks';

import RadioButton from './inputs/RadioButton.js';

/**
 * @typedef {Object} InputProps
 * @property {string} name
 * @property {(arg0: any) => void} [onFocus]
 * @property {string} type
 */

/** @type {import('~/t').Component<InputProps>} */
const Input = (props) => {
  const {
    onFocus
  } = props;
  /** @type {import('~/t').LocalState<boolean>} */
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
