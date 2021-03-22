import styles from './Button.module.css';

function Button(props) {
  const {
    className = ``,
    ...otherProps
  } = props;

  return (
    <button
      className={`${styles.button} ${className}`}
      {...otherProps}
    />
  );
}

export default Button;
