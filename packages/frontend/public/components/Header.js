
import SiteMenu from './SiteMenu';

import styles from './Header.module.css';
import layoutStyles from './Layout.module.css';

function Header() {
  return (
    <header
      className={`${layoutStyles.layout} ${styles.header}`}
      id="header"
    >
      <h1>header</h1>

      <SiteMenu />
    </header>
  );
}

export default Header;
