import {
  useButton
} from '@react-aria/button';
import {
  useRef
} from 'preact/hooks';

import styles from './Button.module.css';

function Button(props) {
  const ref = useRef();
  const {
    buttonProps
  } = useButton(props, ref);

  return (
    <button className={styles.primary} {...buttonProps} ref={ref}>
      dogg
    </button>
  );
}

export default Button;
