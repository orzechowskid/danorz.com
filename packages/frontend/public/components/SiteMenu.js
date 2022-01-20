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
    // buttonProps,
    isSignedIn,
    onDismissMenu,
    onSignOut,
    // state,
    t,
    triggerButtonRef,
    state: {
      isOpen,
      setOpen
    }
  };
}

const SiteMenu = () => {
  const {
    //    buttonProps = {},
    isSignedIn,
    onDismissMenu,
    onSignOut,
    state = {},
    t,
    triggerButtonRef
  } = useSiteMenu();

  return (
    <>
      <button
        ref={triggerButtonRef}
        aria-label={t(`SiteMenu:trigger-label`)}
        class={styles.menuTrigger}
        {...{}/*buttonProps*/}
        onClick={() => state.setOpen(true)}
      >
        <span
          class={styles.menuTriggerIcon}
          role="presentation"
        >
          &#x2630;
        </span>
      </button>

      {state.isOpen && (
        <ModalDialog
          class={styles.siteMenu}
          isOpen
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
