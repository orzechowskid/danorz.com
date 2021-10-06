import {
  FocusScope
} from '@react-aria/focus';
import {
  useButton
} from '@react-aria/button';
import {
  useOverlayTriggerState
} from '@react-stately/overlays';
import {
  useCallback,
  useRef
} from 'preact/hooks';

import {
  useModalDialog,
  ModalBackdrop
} from '~/components/ModalDialog.js';
import SignInForm from '~/components/SignInForm.js';
import {
  useI18n
} from '~/utils/useI18n.js';
import {
  useSession
} from '~/utils/useSession.js';

import styles from './SiteMenu.module.css';

function useSiteMenu() {
  const {
    t
  } = useI18n();
  const state = useOverlayTriggerState({});
  const triggerButtonRef = useRef();
  const {
    buttonProps
  } = useButton(
    {
      onPress: state.open
    },
    triggerButtonRef
  );
  const {
    isSignedIn,
    signOut
  } = useSession();
  const onSignOut = useCallback(
    async function onSignOut() {
      signOut();
      state.close();
    },
    [ signOut, state?.close ]);

  return {
    buttonProps,
    isSignedIn,
    onSignOut,
    state,
    t,
    triggerButtonRef
  };
}

/**
 * @typedef {Object} SiteMenuContainerProps
 * @property {() => void} onClose
 */

/**
 * @param {SiteMenuContainerProps} props
 */
function useSiteMenuContainer(props) {
  const {
    children,
    dialogContentsRef,
    dialogProps,
    modalProps,
    overlayProps,
    underlayProps
  } = useModalDialog({
    ...props,
    isDismissable: true,
    isOpen: true
  });

  return {
    children,
    dialogContentsProps: {
      ...overlayProps,
      ...dialogProps,
      ...modalProps
    },
    dialogContentsRef,
    underlayProps
  };
}

/** @type {import('~/t').Component<SiteMenuContainerProps>} */
const SiteMenuContainer = (props) => {
  const {
    children,
    dialogContentsProps,
    dialogContentsRef,
    underlayProps
  } = useSiteMenuContainer(props);

  return (
    <ModalBackdrop {...underlayProps}>
      <div
        ref={dialogContentsRef}
        {...dialogContentsProps}
        className={styles.siteMenu}
      >
        <FocusScope
          autoFocus
          contain
          restoreFocus
        >
          {children}
        </FocusScope>
      </div>
    </ModalBackdrop>
  );
}

const SiteMenu = () => {
  const {
    buttonProps,
    isSignedIn,
    onSignOut,
    state,
    t,
    triggerButtonRef
  } = useSiteMenu();

  return (
    <>
      <button
        ref={triggerButtonRef}
        className={styles.menuTrigger}
        {...buttonProps}
      >
        <span className={styles.menuTriggerIcon}>
          &#x2630;
        </span>
      </button>

      {state.isOpen && (
        <SiteMenuContainer onClose={state.close}>
          {isSignedIn
            ? <button onClick={onSignOut}>{t(`sign-out`)}</button>
            : <SignInForm />
          }
        </SiteMenuContainer>
      )}
    </>
  );
};

export default SiteMenu;
