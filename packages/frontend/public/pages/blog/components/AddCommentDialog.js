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

import styles from './AddCommentDialog.module.css';

/**
 * @typedef {Object} AddCommentDialogProps
 * @property {() => void} onCancel
 * @property {(string) => void} onSubmit
 */

/** @param {AddCommentDialogProps} props */
function useAddCommentDialog(props) {
  const {
    onSubmit
  } = props;
  const {
    on: previewMode,
    toggle: onTogglePreview
  } = useToggle(false);
  const {
    t
  } = useI18n();
  const [ errorMessage, setErrorMessage ] = useState(` `);
  const onSubmitComment = useCallback(function onSubmitComment(e) {
    const formData = new FormData(e.target);
    const commentText = formData.get(`commentText`);

    e.preventDefault();

    if (commentText.length < 10) {
      setErrorMessage(`10 chars or more plz`);
    }
    else {
      onSubmit(commentText);
    }
  }, [ onSubmit ]);
  /** @type {import('preact').RefObject<HTMLFormElement>} */
  const formRef = useRef();

  useEffect(function onMount() {
    formRef.current?.querySelector(`textarea`)?.focus();
  }, []);

  return {
    ...props,
    errorMessage,
    formRef,
    onSubmitComment,
    onTogglePreview,
    previewMode,
    t
  };
}

/** @type {import('preact').FunctionComponent<AddCommentDialogProps>} */
const AddCommentDialog = function(props) {
  const {
    errorMessage,
    formRef,
    onCancel,
    onSubmitComment,
    onTogglePreview,
    previewMode,
    t
  } = useAddCommentDialog(props);

  return (
    <ModalDialog
      className={styles.addCommentDialog}
      onClose={onCancel}
      title={t(`AddCommentDialog:title`)}
    >
      <form
        onSubmit={onSubmitComment}
        ref={formRef}
      >
        <MarkdownPreviewPane
          className={styles.markdownPreviewPane}
          name="commentText"
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
            add comment
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

export default AddCommentDialog;
