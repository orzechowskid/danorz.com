import styles from './RadioButton.module.css';

/**
 * @typedef {Object} RadioButtonProps
 * @property {string} [className]
 */

/** @type {import('~/t').Component<RadioButtonProps>} */
const RadioButton = (props) => {
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
