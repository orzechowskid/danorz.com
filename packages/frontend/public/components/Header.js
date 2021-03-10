
import SiteBanner from './SiteBanner';
import SiteMenu from './SiteMenu';

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
        <h1>header</h1>

        <SiteMenu />
      </div>
    </header>
  );
}

export default Header;
