import Layout from './Layout';

import styles from './Footer.module.css';
import layoutStyles from './Layout.module.css';

/** @type {import('../types').Component<undefined>} */
function Footer() {
  return (
    <footer className={styles.footer}>
      <nav className={layoutStyles.layout}>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/blog">Blog</a></li>
        </ul>
      </nav>
    </footer>
  );
}

export default Footer;
