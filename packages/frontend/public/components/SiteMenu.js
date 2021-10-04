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
  useRef
} from 'preact/hooks';

import {
  useModalDialog,
  ModalBackdrop
} from '~/components/ModalDialog.js';
import SignInForm from '~/components/SignInForm.js';

import styles from './SiteMenu.module.css';

function useSiteMenuContainer() {
  return {};
}

/**
 * @typedef {Object} SiteMenuContainerProps
 * @property {() => void} onClose
 */

/** @type {import('~/t').Component<SiteMenuContainerProps>} */
const SiteMenuContainer = (props) => {
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

  return (
    <ModalBackdrop {...underlayProps}>
      <div
        ref={dialogContentsRef}
        {...overlayProps}
        {...dialogProps}
        {...modalProps}
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
        <SiteMenuContainer
          onClose={state.close}
        >
          <SignInForm />
        </SiteMenuContainer>
      )}
    </>
  );
};

export default SiteMenu;
