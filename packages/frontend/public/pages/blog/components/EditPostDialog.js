import {
  useCallback,
  useEffect,
  useRef,
  useState
} from 'preact/hooks';

import MarkdownPreviewPane from '~/components/MarkdownPreviewPane.js';
import ModalDialog from '~/components/ModalDialog.js';
import {
  useI18n
} from '~/utils/useI18n.js';
import {
  useToggle
} from '~/utils/useToggle.js';

import styles from './EditPostDialog.module.css';

/**
 * @typedef {Object} EditPostDialogProps
 * @property {Error} [error]
 * @property {string} initialValue
 * @property {() => void} onCancel
 * @property {(newText: string) => void} onSubmit
 */

/** @param {EditPostDialogProps} props */
function useEditPostDialog(props) {
  const {
    error,
    onSubmit
  } = props;
  const {
    on: previewMode,
    toggle: onTogglePreview
  } = useToggle(false);
  const {
    t
  } = useI18n();
  const [ errorMessage, setErrorMessage ] = useState(error?.message);
  const onSubmitEdit = useCallback(function onSubmitEdit(e) {
    const formData = new FormData(e.target);
    const postText = formData.get(`postText`);

    e.preventDefault();

    if (postText.length < 10) {
      setErrorMessage(`10 chars or more plz`);
    }
    else {
      // TODO: standardize on passing FormData objects?
      onSubmit(postText);
    }
  }, [ onSubmit ]);
  /** @type {import('preact').RefObject<HTMLFormElement>} */
  const formRef = useRef();

  useEffect(function onMount() {
    formRef.current?.querySelector(`textarea`)?.focus();
  }, []);

  useEffect(function onError() {
    setErrorMessage(error?.message ? `o no something went wrong` : undefined);
  }, [ error?.message ]);

  return {
    ...props,
    errorMessage,
    formRef,
    onSubmitEdit,
    onTogglePreview,
    previewMode,
    t
  };
}

/** @type {import('preact').FunctionComponent<EditPostDialogProps>} */
const EditPostDialog = function(props) {
  const {
    errorMessage,
    formRef,
    initialValue,
    onCancel,
    onSubmitEdit,
    onTogglePreview,
    previewMode,
    t
  } = useEditPostDialog(props);

  return (
    <ModalDialog
      className={styles.editPostDialog}
      onClose={onCancel}
      title={t(`EditPostDialog:title`)}
    >
      <form
        onSubmit={onSubmitEdit}
        ref={formRef}
      >
        <MarkdownPreviewPane
          className={styles.markdownPreviewPane}
          initialValue={initialValue}
          name="postText"
          previewMode={previewMode}
        />
        <div role="status">
          {errorMessage}
        </div>
        <div role="group">
          <button
            aria-pressed={previewMode}
            onClick={onTogglePreview}
            type="button"
          >
            preview
          </button>
          <button type="submit">
            update post
          </button>
          <button
            onClick={onCancel}
            type="button"
          >
            cancel
          </button>
        </div>
      </form>
    </ModalDialog>
  );
};

export default EditPostDialog;
