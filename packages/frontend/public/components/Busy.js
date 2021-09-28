import styles from './Busy.module.css';

/**
 * @typedef {Object} BusyContainerProps
 * @property {string} [as]
 * @property {import('preact').ComponentChildren} children
 * @property {string} [className]
 * @property {boolean} [ready]
 */

/** @type {import('~/t').Component<BusyContainerProps>} */
const BusyContainer = function(props) {
  const {
    as: ElementName = `div`,
    children,
    className = ``,
    ready,
    ...otherProps
  } = props;

  return (
    <ElementName
      aria-busy={!ready}
      className={`${styles.busy} ${className}`}
      {...otherProps}
    >
      {children}
    </ElementName>
  );
};

export default BusyContainer;
