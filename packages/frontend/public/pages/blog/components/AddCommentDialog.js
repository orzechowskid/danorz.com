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
    onCancel,
    onSubmit
  } = props;
  const {
    on: previewMode,
    toggle: onTogglePreview
  } = useToggle(false);
  const {
    t
  } = useI18n();

  return {
    onCancelAddComment: onCancel,
    onSubmitComment: onSubmit,
    onTogglePreview,
    previewMode,
    t
  };
}

/** @type {import('preact').FunctionComponent<AddCommentDialogProps>} */
const AddCommentDialog = function(props) {
  const {
    onCancelAddComment,
    onSubmitComment,
    onTogglePreview,
    previewMode,
    t
  } = useAddCommentDialog(props);

  return (
    <ModalDialog
      className={styles.addCommentDialog}
      onClose={onCancelAddComment}
      title={t(`AddCommentDialog:title`)}
    >
      <form>
        <MarkdownPreviewPane
          className={styles.markdownPreviewPane}
          previewMode={previewMode}
        />
        <div>
          <button
            aria-pressed={previewMode}
            onClick={onTogglePreview}
          >
            preview
          </button>
          <button onClick={onSubmitComment}>add comment</button>
          <button onClick={onCancelAddComment}>cancel</button>
        </div>
      </form>
    </ModalDialog>
  );
};

export default AddCommentDialog;
