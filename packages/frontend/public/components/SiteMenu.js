import {
  useOverlay,
  usePreventScroll,
  useModal,
  OverlayContainer
} from '@react-aria/overlays';
import {
  useDialog
} from '@react-aria/dialog';
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

import Input from '~/components/Input.js';
import ModalDialog from '~/components/ModalDialog.js';

/**
 * @typedef {Object} ModalDialogOwnProps
 * @property {string} [title]
 * @property {any} children
 *
 * @typedef {import('@react-aria/overlays').OverlayProps & import('@react-types/dialog').AriaDialogProps & ModalDialogOwnProps} ModalDialogProps
 */

/** @type {import('~/t').Component<ModalDialogProps>} */
const xModalDialog = (props) => {
  const {
    children,
    title
  } = props;
  const dialogContentsRef = useRef();
  const {
    overlayProps,
    underlayProps
  } = useOverlay(props, dialogContentsRef);
  const {
    modalProps
  } = useModal();
  const {
    dialogProps,
    titleProps
  } = useDialog(props, dialogContentsRef)

  usePreventScroll();

  /*
   * underlay: mouse interaction
   * overlay: full-bleed translucent
   */
  return (
    <div style={{
      background: '', position: 'fixed', top: 0, left: 0, bottom: 0, right: 0, zIndex: 1
    }}>
      <div style={{
        width: '400px', height: '400px', display: 'flex', justifyContent: 'center', background: 'red', alignItems: 'center'
      }} {...underlayProps}>
        <FocusScope autoFocus contain restoreFocus>
          <div ref={dialogContentsRef}
            {...overlayProps} {...dialogProps} {...modalProps} style={{
              background: 'purple'
            }}>
            <Input type="text" name="foo" />
            <Input type="text" name="bar" />
          </div>
        </FocusScope>
      </div>
    </div>
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
        {...buttonProps}
      >
        sitemenu
      </button>

      {state.isOpen && (
        <OverlayContainer>
          <ModalDialog
            isOpen
            title="dialogg"
            onClose={state.close}
            isDismissable
          >
            <form style={{
              display: 'flex', flexDirection: 'column'
            }}>
              <Input name="foo" type="text" />
              <Input name="bar" type="text" />
            </form>
          </ModalDialog>
        </OverlayContainer>
      )}
    </>
  );
};

export default SiteMenu;
