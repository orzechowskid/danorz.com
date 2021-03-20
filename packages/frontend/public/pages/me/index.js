import * as types from '../../types.js';

import layoutStyles from '../../components/Layout.module.css';
import styles from './index.module.css';

/** @type {types.Component<undefined>} */
function PrivateHome() {
  return (
    <div className={layoutStyles.layout}>
      <div className={styles.feed}>
        <span>Feed</span>
      </div>

      <aside className={styles.otherStuff}>
        {"other stuff"}
      </aside>
    </div>
  );
}

export default PrivateHome;
