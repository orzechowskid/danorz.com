import * as types from '~/types.js';

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
    <button
      className={`${styles.linkButton} ${className}`}
      {...otherProps}
    />
  );
}

export default LinkButton;
