import layoutStyles from '../../components/Layout.module.css';
import styles from './index.module.css';

/** @type {import('~/t').Component<void>} */
const PrivateHome = () => (
  <div className={layoutStyles.layout}>
    <div className={styles.feed}>
      <span>Feed</span>
    </div>

    <aside className={styles.otherStuff}>
      {"other stuff"}
    </aside>
  </div>
)

export default PrivateHome;
