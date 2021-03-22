import {
  useButton
} from '@react-aria/button';
import {
  useDialog
} from '@react-aria/dialog';
import {
  FocusScope
} from '@react-aria/focus';
import {
  DismissButton,
  useOverlay,
  useOverlayTrigger
} from '@react-aria/overlays';
import {
  useOverlayTriggerState
} from '@react-stately/overlays';
import {
  useRef
} from 'preact/hooks';

import * as types from '~/types.js';

import LocaleMenu from '~/components/LocaleMenu.js';
import ModalDialog from '~/components/ModalDialog.js';
import SignInForm from '~/components/SignInForm.js';
import {
  selectAppClientVersion,
  selectAppServerVersion
} from '~/state/globalState.js';
import {
  selectLocale,
  selectSupportedLocales
} from '~/state/i18n.js';
import {
  doSignOut,
  selectSignedIn
} from '~/state/session.js';
import {
  useActionCreators,
  useSelectors
} from '~/utils/useGlobalState.js';
import {
  useI18n
} from '~/utils/useI18n.js';

import styles from './SiteMenu.module.css';

/**
 * @typedef {Object} SiteMenuContentsProps
 * @property {boolean} isSignedIn
 * @property {() => void} onClose
 * @property {Object} overlayTriggerProps
 */

/** @type {types.Component<SiteMenuContentsProps>} */
function SiteMenuContents(props) {
  const {
    onClose,
    overlayTriggerProps
  } = props;
  const {
    t
  } = useI18n();
  const siteMenuElRef = useRef();
  const {
    overlayProps
  } = useOverlay(
    {
      isDismissable: true,
      isOpen: true,
      onClose
    },
    siteMenuElRef
  );
  const {
    dialogProps
  } = useDialog(
    {
      'aria-label': t(`SiteMenu:site-nav`),
      id: `site-menu`,
      role: `dialog`
    },
    siteMenuElRef
  );
  const {
    clientVersion,
    isSignedIn,
    serverVersion
  } = useSelectors({
    clientVersion: selectAppClientVersion,
    currentLocale: selectLocale,
    isSignedIn: selectSignedIn,
    serverVersion: selectAppServerVersion,
    supportedLocales: selectSupportedLocales
  });
  const actions = useActionCreators({
    doSignOut
  });

  return (
    <div
      className={styles.siteMenuBackground}
    >
      <div
        ref={siteMenuElRef}
        className={styles.siteMenu}
        {...overlayProps}
        {...dialogProps}
        {...overlayTriggerProps}
      >
        <FocusScope
          autoFocus
          contain
          restoreFocus
        >
          <div
            className={styles.siteMenuHeader}
            role="presentation"
          >
            {t(`SiteMenu:hello`)}
          </div>
          {isSignedIn ? (
            <>
              <button>
                {t(`Page:settings`)}
              </button>
              <button onClick={actions.doSignOut}>
                {t(`SiteMenu:sign-out`)}
              </button>
            </>
          ) : (
            <SignInForm />
          )}

          <LocaleMenu className={styles.menuSection} />

          <div className={`${styles.menuSection} ${styles.versionInfoSection}`}>
            <div>
              c{clientVersion}
            </div>
            <div>
              s{serverVersion}
            </div>
          </div>
          <DismissButton onDismiss={onClose} />
        </FocusScope>
      </div>
    </div>
  );
}

/** @type {types.Component<undefined>} */
function SiteMenu() {
  const {
    t
  } = useI18n();
  const menuState = useOverlayTriggerState({});
  const triggerElRef = useRef();
  const {
    overlayProps: overlayTriggerProps,
    triggerProps
  } = useOverlayTrigger(
    { type: `dialog` },
    menuState,
    triggerElRef
  );
  const {
    buttonProps
  } = useButton(
    { onPress: menuState.open },
    triggerElRef
  );
  const isSignedIn = false;

  return (
    <>
      <button
        {...buttonProps}
        {...triggerProps}
        ref={triggerElRef}
        aria-label={t('SiteMenu:trigger-label')}
        className={styles.menuTrigger}
      >
        <span className={styles.menuTriggerIcon}>
          &#x2630;
        </span>
      </button>

      {menuState.isOpen && (
        <ModalDialog>
          <SiteMenuContents
            isSignedIn={isSignedIn}
            onClose={menuState.close}
            overlayTriggerProps={overlayTriggerProps}
          />
        </ModalDialog>
      )}
    </>
  );
}

export default SiteMenu;