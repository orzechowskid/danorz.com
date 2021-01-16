import * as types from '~/types';
import styles from '~/components/Layout.module.css';

import Feed from './components/Feed';

/** @type {types.Component<undefined>} */
function Blog() {
  return (
    <div className={styles.layout}>
      <Feed />
    </div>
  );
}

export default Blog;
