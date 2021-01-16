import Button from '../../shared/Button';

import Feed from './components/Feed';

import styles from './index.module.css';

import * as types from '../../types';

/** @type {types.Component<undefined>} */
function PrivateHome() {
  return (
    <div className={styles.container}>
      <div className={styles.feed}>
        <Feed />
      </div>

      <aside className={styles.otherStuff}>
        {"other stuff"}
      </aside>
    </div>
  );
}

export default PrivateHome;
