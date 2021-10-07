import styles from './Textarea.module.css';

/** @type {import('~/t').Component<{ className?: string }>} */
const Textarea = (props) => {
  const {
    className,
    ...otherProps
  } = props;

  return (
    <textarea
      className={`${styles.textarea} ${className}`}
      {...otherProps}
    />
  );
};

export default Textarea;
