import * as types from '~/types';

import {
  doSetLocale,
  selectLocale,
  selectSupportedLocales
} from '~/state/i18n';
import {
  useActionCreators,
  useSelectors
} from '~/utils/useGlobalState';
import {
  useI18n
} from '~/utils/useI18n';

import styles from './LocaleMenu.module.css';

/**
 * @typedef {Object} LocaleMenuProps
 * @property {string} [className]
 */

/** @type {types.Component<LocaleMenuProps>} */
function LocaleMenu(props) {
  const {
    className
  } = props;
  const {
    currentLocale,
    supportedLocales
  } = useSelectors({
    currentLocale: selectLocale,
    supportedLocales: selectSupportedLocales
  });
  const actions = useActionCreators({
    doSetLocale
  });
  const {
    t
  } = useI18n();

  return (
    <div className={className}>
      <div
        className={`${styles.siteMenuHeader} ${styles.localeMenuHeader}`}
        role="presentation"
      >
        <span>🌐</span>
        <span className={styles.speechBubble}>💬</span>
      </div>

      <ol
        aria-label={t(`LocaleMenu:label`)}
        className={styles.localeMenu}
        id="locale-menu"
      >
        {Object.entries(supportedLocales).map(([locale, localeText]) => (
          <li
            key={locale}
            role="menuitem"
          >
            <button
              className={styles.localeOption}
              onClick={() => actions.doSetLocale(locale)}
            >
              {localeText}

              {locale === currentLocale && (
                <span>✓</span>
              )}
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default LocaleMenu;
