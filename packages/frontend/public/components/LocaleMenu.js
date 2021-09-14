import Input from '~/components/Input.js';
import {
  useI18n,
  useLocale,
  useSupportedLocales
} from '~/utils/useI18n.js';

import styles from './LocaleMenu.module.css';

function useLocaleMenu() {
  const {
    locale,
    setLocale
  } = useLocale();
  const supportedLocales = useSupportedLocales();

  return {
    locale,
    setLocale,
    supportedLocales
  };
}

/**
 * @typedef {Object} LocaleMenuProps
 * @property {string} [className]
 */

/** @type {import('~/t').Component<LocaleMenuProps>} */
const LocaleMenu = (props) => {
  const {
    className
  } = props;
  const {
    locale,
    setLocale,
    supportedLocales
  } = useLocaleMenu();
  const {
    t
  } = useI18n();

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
        {Object.entries(supportedLocales).map(([ supportedLocale, localeText ]) => (
          <label key={supportedLocale}>
            <Input
              checked={supportedLocale.toLowerCase() === locale.toLowerCase()}
              className={styles.localeOption}
              name="locale"
              onClick={() => setLocale(supportedLocale)}
              type="radio"
              value={supportedLocale}
            />
            {localeText}
          </label>
        ))}
      </fieldset>
    </form>
  );
}

export default LocaleMenu;
