import {
  useCallback,
  useRef,
  useState
} from 'preact/hooks';

import ModalDialog from '~/components/ModalDialog.js';
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
  const [ isOpen, setOpen ] = useState(false);
  // const state = useOverlayTriggerState({});
  const triggerButtonRef = useRef();
  // const {
  //   buttonProps
  // } = useButton(
  //   {
  //     onPress: state.open
  //   },
  //   triggerButtonRef
  // );
  const {
    isSignedIn,
    signOut
  } = useSession();
  const onTriggerClick = useCallback(
    function onTriggerClick() {
      setOpen(true);
    },
    []
  );
  const onSignOut = useCallback(
    async function onSignOut() {
      signOut();
      // state.close();
    },
    [ signOut/*, state?.close*/ ]
  );
  const onDismissMenu = useCallback(
    function onDismissMenu() {
      setOpen(false);
    },
    []
  );

  return {
    isMenuVisible: isOpen,
    isSignedIn,
    onDismissMenu,
    onSignOut,
    t,
    triggerButtonRef,
    onTriggerClick
  };
}

const SiteMenu = () => {
  const {
    isMenuVisible,
    isSignedIn,
    onDismissMenu,
    onSignOut,
    onTriggerClick,
    t,
    triggerButtonRef
  } = useSiteMenu();

  return (
    <>
      <button
        ref={triggerButtonRef}
        aria-label={t(`SiteMenu:trigger-label`)}
        class={styles.menuTrigger}
        onClick={onTriggerClick}
      >
        <span
          class={styles.menuTriggerIcon}
          role="presentation"
        >
          &#x2630;
        </span>
      </button>

      {isMenuVisible && (
        <ModalDialog
          class={styles.siteMenu}
          onDismiss={onDismissMenu}
          triggerRef={triggerButtonRef}
        >
          {isSignedIn
            ? <button onClick={onSignOut}>{t(`SiteMenu:sign-out`)}</button>
            : <SignInForm />
          }
        </ModalDialog>
      )}
    </>
  );
};

export default SiteMenu;
