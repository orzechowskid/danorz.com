import SiteBanner from './SiteBanner.js';
import SiteMenu from './SiteMenu.js';

import styles from './Header.module.css';
import layoutStyles from './Layout.module.css';

function Header() {
  return (
    <header
      className={styles.header}
      id="header"
    >
      <SiteBanner />

      <div className={`${layoutStyles.layout} ${styles.headerContents}`}>
        <h1>danorz dot com</h1>

        <SiteMenu />
      </div>
    </header>
  );
}

export default Header;
