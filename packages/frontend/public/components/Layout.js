import styles from './Layout.module.css';

import * as types from '~/types';

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

