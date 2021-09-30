import {
  useDialog
} from '@react-aria/dialog';
import {
  FocusScope
} from '@react-aria/focus';
import {
  useModal,
  useOverlay,
  usePreventScroll
} from '@react-aria/overlays';
import {
  useRef
} from 'preact/hooks';

import {
  useAnimateElement
} from '~/utils/useAnimateElement.js';
import {
  useI18n
} from '~/utils/useI18n.js';

import styles from './ModalDialog.module.css';

/**
 * @typedef {Object} ModalDialogOwnProps
 * @property {string} [title]
 * @property {import('preact').ComponentChildren} children
 *
 * @typedef {import('@react-aria/overlays').OverlayProps & import('@react-types/dialog').AriaDialogProps & ModalDialogOwnProps} ModalDialogProps
 */

/**
 * @param {ModalDialogProps} props
 */
// function useModalDialog(props) {
//   useAnimateElement({
//     className: `animate`,
//     ref: dialogContainerRef
//   });
//   usePreventScroll();

//   return {
//   };
// }

/** @type {import('~/t').Component<ModalDialogProps>} */
const ModalDialog = function(props) {
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
    <div className={styles.overlay}>
      <div className={styles.dialogContainer} {...underlayProps}>
        <FocusScope autoFocus contain restoreFocus>
          <div ref={dialogContentsRef}
            {...overlayProps} {...dialogProps} {...modalProps} style={{
              background: 'purple'
            }}>
            {title && <h3 {...titleProps}>{title}</h3>}
            {children}
          </div>
        </FocusScope>
      </div>
    </div>
  );
}

export default ModalDialog;
