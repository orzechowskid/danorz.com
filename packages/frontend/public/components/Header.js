import SiteBanner from '~/components/SiteBanner.js';
import SiteMenu from '~/components/SiteMenu.js';
import {
  useSiteSettings
} from '~/utils/useSiteSettings.js';

import styles from './Header.module.css';
import layoutStyles from './Layout.module.css';

function useHeader() {
  const {
    data,
    getSetting
  } = useSiteSettings();
  return {
    siteName: getSetting(`site.title`)
  }
}

function Header() {
  const {
    siteName
  } = useHeader();

  return (
    <header
      className={styles.header}
      id="header"
    >
      <SiteBanner />

      <div className={`${layoutStyles.layout} ${styles.headerContents}`}>
        <h1>{siteName}</h1>

        <SiteMenu />
      </div>
    </header>
  );
}

export default Header;
