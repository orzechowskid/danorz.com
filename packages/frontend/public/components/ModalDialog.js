import {
  useDialog
} from '@react-aria/dialog';
import {
  FocusScope
} from '@react-aria/focus';
import {
  useModal,
  useOverlay,
  usePreventScroll,
  OverlayContainer
} from '@react-aria/overlays';
import {
  useRef
} from 'preact/hooks';

import {
  useI18n
} from '~/utils/useI18n.js';

import styles from './ModalDialog.module.css';

/**
 * @typedef {Object} ModalDialogOwnProps
 * @property {string} [title]
 * @property {import('preact').ComponentChildren} [children]
 *
 * @typedef {import('@react-aria/overlays').OverlayProps & import('@react-types/dialog').AriaDialogProps & ModalDialogOwnProps} ModalDialogProps
 */

/** @type {import('~/t').Component<{children: import('preact').ComponentChildren}> */
const ModalBackdrop = (props) => {
  const {
    children,
    ...otherProps
  } = props;

  return (
    <OverlayContainer>
      <div
        className={styles.overlay}
        {...otherProps}
      >
        {children}
      </div>
    </OverlayContainer>
  );
};

/**
 * @param {ModalDialogProps} props
 */
function useModalDialog(props) {
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

  return {
    children,
    dialogContentsRef,
    dialogProps,
    modalProps,
    overlayProps,
    title,
    titleProps,
    underlayProps
  };
}

/** @type {import('~/t').Component<ModalDialogProps>} */
const ModalDialog = function(props) {
  const {
    children,
    dialogContentsRef,
    dialogProps,
    modalProps,
    overlayProps,
    title,
    titleProps,
    underlayProps
  } = useModalDialog(props);

  return (
    <ModalBackdrop>
      <div
        className={styles.dialogContainer}
        {...underlayProps}
      >
        <FocusScope autoFocus contain restoreFocus>
          <div
            ref={dialogContentsRef}
            {...overlayProps}
            {...dialogProps}
            {...modalProps}
          >
            {title && (
              <h3 {...titleProps}>
                {title}
              </h3>
            )}
            {children}
          </div>
        </FocusScope>
      </div>
    </ModalBackdrop>
  );
}

export {
  ModalBackdrop,
  useModalDialog
};
export default ModalDialog;
