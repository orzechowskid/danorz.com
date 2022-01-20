import useFocusLock, {
  FocusGuard
} from 'focus-layers';
import {
  createContext
} from 'preact';
import {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState
} from 'preact/hooks';

import Portal from '~/components/Portal.js';

import styles from './ModalDialog.module.css';

/**
 * @typedef {Object} ModalDialogProps
 * @property {import('preact').ComponentChildren} [children]
 * @property {string} [class]
 * @property {boolean} isOpen
 * @property {() => void} [onDismiss]
 * @property {string} [title]
 * @property {import('preact/hooks').Ref<HTMLElement>} [triggerRef]
 *
 * @typedef EscapeToCloseProps
 * @property {() => void} onEscape
 * @property {import('preact/hooks').Ref<HTMLElement>} ref
 */

/** @type {import('~/t').Context<Record<string, function>>} */
const ModalDialogContext = createContext(undefined);

/** @type {import('~/t').Component<{}>} */
const ModalDialogProvider = (props) => {
  const {
    children
  } = props;
  /** @type {import('preact/hooks').MutableRef<boolean>} */
  const mountedRef = useRef(false);
  const onDialogMount = useCallback(function onDialogMount() {
    if (mountedRef.current) {
      throw new Error(`only one modal dialog can be mounted at a time`);
    }

    mountedRef.current = true;
    document?.querySelector(`#app`)?.setAttribute(`aria-hidden`, `true`);
  }, []);
  const onDialogUnmount = useCallback(function onDialogUnmount() {
    mountedRef.current = false;
    document?.querySelector(`#app`)?.removeAttribute(`aria-hidden`);
  }, []);

  return (
    <ModalDialogContext.Provider value={{
      onDialogMount, onDialogUnmount
    }}>
      {children}
    </ModalDialogContext.Provider>
  );
};

/**
 * @param {EscapeToCloseProps} opts
 */
function useEscapeToClose(opts) {
  const {
    onEscape,
    ref
  } = opts;

  useLayoutEffect(function manageEventListener() {
    /** @param {KeyboardEvent} e */
    function onKeyDown(e) {
      if (e.key === `Escape`) {
        onEscape();
      }
    }

    ref.current?.addEventListener(`keydown`, onKeyDown);

    return function cleanup() {
      ref.current?.removeEventListener(`keydown`, onKeyDown);
    };
  }, [ onEscape ]);
}

/** @type {import('~/t').Component<{children: import('preact').ComponentChildren}>} */
const ModalBackdrop = (props) => {
  const {
    class: cls,
    onDismiss,
    ...otherProps
  } = props;

  return (
    <div
      class={`${styles.overlay} ${cls ?? ''}`}
      onClick={onDismiss}
      {...otherProps}
    />
  );
};

/**
 * @param {ModalDialogProps} props
 */
function useModalDialog(props) {
  const {
    children,
    class: cls,
    isOpen,
    onDismiss,
    title,
    triggerRef
  } = props;
  const contextManager = useContext(ModalDialogContext);
  /** @type {import('preact/hooks').Ref<HTMLElement>} */
  const dialogContentsRef = useRef(null);
  const onEscape = useCallback(function onEscape() {
    onDismiss?.();
  }, [ onDismiss ]);
  useEscapeToClose({
    onEscape,
    ref: dialogContentsRef
  });

  useFocusLock(dialogContentsRef, {
    returnRef: triggerRef
  });

  if (!contextManager) {
    throw new Error(`can't useModalDialog outside of ModalDialogContext`);
  }

  const {
    onDialogMount,
    onDialogUnmount
  } = contextManager;

  useEffect(function onMount() {
    onDialogMount();

    return function onUnmount() {
      onDialogUnmount();
    };
  }, [ onDialogMount, onDialogUnmount ]);

  return {
    children,
    cls,
    dialogContentsRef,
    isOpen,
    onDismiss,
    title
  };
}

/** @type {import('~/t').Component<ModalDialogProps>} */
const ModalDialog = function(props) {
  const {
    children,
    cls,
    dialogContentsRef,
    isOpen,
    onDismiss,
    title
  } = useModalDialog(props);

  if (!isOpen) {
    return null;
  }

  return (
    <Portal to="#modal-container">
      <ModalBackdrop onDismiss={onDismiss}>
        <FocusGuard />
        <div
          ref={dialogContentsRef}
          class={cls}
        >
          {title && (
            <div>
              {title}
            </div>
          )}
          {children}
        </div>
        <FocusGuard />
      </ModalBackdrop>
    </Portal>
  );
}

export {
  ModalBackdrop,
  ModalDialogProvider,
  useModalDialog
};
export default ModalDialog;
