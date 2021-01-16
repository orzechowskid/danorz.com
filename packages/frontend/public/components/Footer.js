import Layout from './Layout';

import styles from './Footer.module.css';
import layoutStyles from './Layout.module.css';

/** @type {import('../types').Component<undefined>} */
function Footer() {
  return (
    <footer className={styles.footer}>
      <nav className={layoutStyles.layout}>
        <ul>
          <li>Home</li>
          <li>Blog</li>
        </ul>
      </nav>
    </footer>
  );
}

export default Footer;
