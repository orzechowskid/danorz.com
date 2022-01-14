import {
  useRef
} from 'preact/hooks';

import styles from './ModalDialog.module.css';

/**
 * @typedef {Object} ModalDialogOwnProps
 * @property {string} [title]
 * @property {import('preact').ComponentChildren} [children]
 * @property {string} [className]
 *
 * @typedef {import('@react-aria/overlays').OverlayProps & import('@react-types/dialog').AriaDialogProps & ModalDialogOwnProps} ModalDialogProps
 */

/** @type {import('~/t').Component<{children: import('preact').ComponentChildren}>} */
const ModalBackdrop = (props) => {
  const {
    children,
    ...otherProps
  } = props;

  return (
    <div
      className={styles.overlay}
      {...otherProps}
    >
      {children}
    </div>
  );
};

/**
 * @param {ModalDialogProps} props
 */
function useModalDialog(props) {
  const {
    children,
    className,
    title
  } = props;
  const dialogContentsRef = useRef();
  // const {
  //   overlayProps,
  //   underlayProps
  // } = useOverlay(props, dialogContentsRef);
  // const {
  //   modalProps
  // } = useModal();
  // const {
  //   dialogProps,
  //   titleProps
  // } = useDialog(props, dialogContentsRef)

  // usePreventScroll();

  return {
    children,
    className,
    dialogContentsRef,
    // dialogProps,
    // modalProps,
    // overlayProps,
    title
    // titleProps,
    // underlayProps
  };
}

/** @type {import('~/t').Component<ModalDialogProps>} */
const ModalDialog = function(props) {
  const {
    children,
    className,
    dialogContentsRef,
    dialogProps = {},
    modalProps = {},
    overlayProps = {},
    title,
    titleProps = {},
    underlayProps = {}
  } = useModalDialog(props);

  return (
    <ModalBackdrop>
      <div
        className={styles.dialogContainer}
        {...underlayProps}
      >
        <div
          ref={dialogContentsRef}
          {...overlayProps}
          {...dialogProps}
          {...modalProps}
          className={className}
        >
          {title && (
            <div {...titleProps}>
              {title}
            </div>
          )}
          {children}
        </div>
      </div>
    </ModalBackdrop>
  );
}

export {
  ModalBackdrop,
  useModalDialog
};
export default ModalDialog;
