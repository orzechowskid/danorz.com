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

import LocaleMenu from '~/components/LocaleMenu.js';
import ModalDialog from '~/components/ModalDialog.js';
import SignInForm from '~/components/SignInForm.js';
import {
  useI18n
} from '~/utils/useI18n.js';
import {
  useSession
} from '~/utils/useSession.js';
import {
  useSystemVersion
} from '~/utils/useSystemVersion.js';

import styles from './SiteMenu.module.css';

/**
 * @typedef {Object} SiteMenuContentsProps
 * @property {boolean} isSignedIn
 * @property {() => void} onClose
 * @property {Object} overlayTriggerProps
 */

/** @type {import('~/t').Component<SiteMenuContentsProps>} */
const SiteMenuContents = (props) => {
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
    serverVersion
  } = useSystemVersion();
  const {
    isSignedIn,
    signOut
  } = useSession();

  function onNavigateToSettings() {
    onClose();
  }

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
              <div>
                <a
                  href="/settings"
                  onClick={onNavigateToSettings}
                >
                  {t(`Page:settings`)}
                </a>
              </div>
              <button onClick={signOut}>
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

/** @type {import('~/t').Component<void>} */
const SiteMenu = () => {
  const {
    t
  } = useI18n();
  const menuState = useOverlayTriggerState({});
  const triggerElRef = useRef();
  const {
    overlayProps: overlayTriggerProps,
    triggerProps
  } = useOverlayTrigger(
    {
      type: `dialog`
    },
    menuState,
    triggerElRef
  );
  const {
    buttonProps
  } = useButton(
    {
      onPress: menuState.open
    },
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
