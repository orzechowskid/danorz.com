import * as types from '~/types.js';

import Input from '~/components/Input.js';
import {
  doSetLocale,
  selectLocale,
  selectSupportedLocales
} from '~/state/i18n.js';
import {
  doSetUserPreferredLocale
} from '~/state/session.js';
import {
  useActionCreators,
  useSelectors
} from '~/utils/useGlobalState.js';
import {
  useI18n
} from '~/utils/useI18n.js';

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
    doSetLocale,
    doSetUserPreferredLocale
  });
  const {
    t
  } = useI18n();

  function updateLocale(nextLocale) {
    actions.doSetLocale(nextLocale);
    actions.doSetUserPreferredLocale(nextLocale);
  }

  return (
    <form className={`${styles.localeMenu} ${className}`}>
      <div
        className={styles.localeMenuHeader}
        role="presentation"
      >
        <span>🌐</span>
        <span>💬</span>
      </div>

      <fieldset
        aria-label={t(`LocaleMenu:label`)}
        className={styles.localeMenu}
        id="locale-menu"
      >
        {Object.entries(supportedLocales).map(([ locale, localeText ]) => (
          <label key={locale}>
            <Input
              checked={locale.toLowerCase() === currentLocale.toLowerCase()}
              className={styles.localeOption}
              name="locale"
              onClick={() => updateLocale(locale)}
              type="radio"
              value={locale}
            />
            {localeText}
          </label>
        ))}
      </fieldset>
    </form>
  );
}

export default LocaleMenu;
