import {
  useCallback,
  useState
} from 'preact/hooks';

import RadioButton from './inputs/RadioButton.js';

/**
 * @typedef InputProps
 * @property {string} name
 * @property {string} type
 */

/** @type {import('~/t').Component<InputProps>} */
const Input = (props) => {
  const {
    onFocus,
    type
  } = props;
  const [ touched, setTouched ] = useState(false);
  const preOnFocus = useCallback(
    /** @param {FocusEvent} e */
    function preOnFocus(e) {
      setTouched(true);
      /* I think this is a bug in preact's TS typings: "the 'this' context of type
       * 'void' is not assignable to method's 'this' of type 'never'" */
      // @ts-ignore
      onFocus?.(e);
    }, [ onFocus ]
  );
  const inputProps = {
    ...props,
    'data-input-touched': touched || undefined,
    onFocus: preOnFocus
  }

  switch (type) {
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
