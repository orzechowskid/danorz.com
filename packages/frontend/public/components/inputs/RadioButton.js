import * as types from '~/types';

import styles from './RadioButton.module.css';

/** @type {types.Component<object>} */
function RadioButton(props) {
  const {
    className = ``,
    ...otherProps
  } = props;

  return (
    <>
      <input
        className={`${styles.radioButton} ${className}`}
        {...otherProps}
        type="radio"
      />

      <div role="presentation" />
    </>
  );
}

export default RadioButton;
