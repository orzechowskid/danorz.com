import {
  useCallback
} from 'preact/hooks';

import SiteBanner from '~/components/SiteBanner.js';
import SiteMenu from '~/components/SiteMenu.js';
import {
  useSiteSettings
} from '~/utils/useSiteSettings.js';

import styles from './Header.module.css';
import layoutStyles from './Layout.module.css';

function useHeader() {
  const {
    getSetting
  } = useSiteSettings();
  const onClickHeaderLink = useCallback(
    /** @type {import('preact').JSX.MouseEventHandler<HTMLAnchorElement>} */
    function onClickHeaderLink(e) {
      e?.currentTarget.blur();
    }, []
  );

  return {
    onClickHeaderLink,
    siteName: getSetting(`site.title`)
  }
}

/** @type {import('~/t').Component<{}>} */
function Header() {
  const {
    onClickHeaderLink,
    siteName
  } = useHeader();

  return (
    <header
      className={styles.header}
      id="header"
    >
      <SiteBanner />

      <div className={`${layoutStyles.layout} ${styles.headerContents}`}>
        <a
          class={styles.siteName}
          href="/"
          onClick={onClickHeaderLink}
        >
          {siteName}
        </a>

        <SiteMenu />
      </div>
    </header>
  );
}

export default Header;
