import * as types from '~/types.js';

import styles from './Layout.module.css';

function Layout(props) {
  const {
    className = ``,
    ...otherProps
  } = props;

  return (
    <div className={`${className} ${styles.layout}`} {...otherProps} />
  );
}

export default Layout;

