import * as types from '~/types.js';

import Button from '~/components/Button.js';

import styles from './LinkButton.module.css';

/**
 * @typedef {Object} LinkButtonProps
 * @property {Object} children
 * @property {string} [className]
 * @property {(Event) => void} onClick
 */

/** @type {types.Component<LinkButtonProps>} */
function LinkButton(props) {
  const {
    className = ``,
    ...otherProps
  } = props;

  return (
    <Button
      className={`${styles.linkButton} ${className}`}
      {...otherProps}
    />
  );
}

export default LinkButton;
