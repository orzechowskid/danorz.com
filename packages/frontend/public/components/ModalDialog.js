import {
  useDialog
} from '@react-aria/dialog';
import {
  FocusScope
} from '@react-aria/focus';
import {
  useOverlay,
  usePreventScroll
} from '@react-aria/overlays';
import {
  useEffect,
  useRef
} from 'preact/hooks';
import {
  createPortal
} from 'preact/compat';

import {
  useAnimateElement
} from '~/utils/useAnimateElement.js';
import {
  useI18n
} from '~/utils/useI18n.js';

import styles from './ModalDialog.module.css';


/**
 * @typedef {Object} ModalDialogProps
 * @property {import('preact').ComponentChildren} children
 * @property {string} [className]
 * @property {() => void} [onClose]
 * @property {string} title
 */

/**
 * @param {ModalDialogProps} props
 */
function useModalDialog(props) {
  const {
    children,
    onClose
  } = props;
  const {
    t
  } = useI18n();
  const dialogContainerRef = useRef();
  const globalDialogElRef = useRef(document.getElementById(`modal-dialog`));
  const {
    dialogProps,
    titleProps
  } = useDialog({
    isDismissable: true
  }, dialogContainerRef);
  const {
    overlayProps,
    underlayProps
  } = useOverlay({
    'aria-details': t(`ModalDialog:description`),
    'aria-label': `modal dialog`,
    id: `modal`,
    isDismissable: true,
    isOpen: true,
    onClose
  }, dialogContainerRef);

  useAnimateElement({
    className: `animate`,
    ref: dialogContainerRef
  });
  usePreventScroll();
  useEffect(function setIsOpen() {
    globalDialogElRef.current.setAttribute(`open`, ``);

    return function cleanup() {
      globalDialogElRef.current.removeAttribute(`open`);
    };
  }, [])

  return {
    children,
    dialogContainerRef,
    dialogEl: globalDialogElRef.current,
    dialogProps,
    onClose,
    overlayProps,
    titleProps,
    underlayProps
  };
}

/** @type {import('preact').FunctionComponent<ModalDialogProps>} */
const ModalDialog = function(props) {
  const {
    className,
    title
  } = props;
  const {
    children,
    dialogContainerRef,
    dialogEl,
    dialogProps,
    onClose,
    overlayProps,
    titleProps,
    underlayProps
  } = useModalDialog(props);

  return (
    createPortal(
      <div
        className={styles.overlay}
        onClose={onClose}
        {...underlayProps}
      >
        <FocusScope
          autoFocus
          contain
          restoreFocus
        >
          <div
            ref={dialogContainerRef}
            className={`animate ${styles.dialogContainer} ${className}`}
            {...overlayProps}
            {...dialogProps}
          >
            <h3 {...titleProps}>{title}</h3>
            {children}
          </div>
        </FocusScope>
      </div>,
      dialogEl
    )
  );
}

export default ModalDialog;
