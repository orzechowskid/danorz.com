import Button from '~/components/Button.js';

import styles from './LinkButton.module.css';

/**
 * @typedef {Object} LinkButtonProps
 * @property {Object} children
 * @property {string} [className]
 * @property {(Event) => void} onClick
 */

/** @type {import('~/t').Component<LinkButtonProps>} */
const LinkButton = (props) => {
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
