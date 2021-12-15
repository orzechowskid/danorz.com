import {
  useCallback,
  useEffect,
  useRef
} from 'preact/hooks';

import MarkdownPreviewPane from '~/components/MarkdownPreviewPane.js';
import ModalDialog from '~/components/ModalDialog.js';
import {
  useGlobalToast
} from '~/utils/useGlobalToast.js';
import {
  useI18n
} from '~/utils/useI18n.js';
import {
  useToggle
} from '~/utils/useToggle.js';

import styles from './EditPostDialog.module.css';

/**
 * @typedef {Object} EditPostDialogProps
 * @property {import('dto').BlogPost} [post]
 * @property {() => void} onCancel
 * @property {(post: import('dto').BlogPost) => void} onSubmit
 */

/** @param {EditPostDialogProps} props */
function useEditPostDialog(props) {
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
  const {
    toast
  } = useGlobalToast();
  const onSubmitEdit = useCallback(function onSubmitEdit(e) {
    const formData = new FormData(e.target);
    /** @type {string|null} */
    /* we know what it is */
    const postText = /** @type {string|null} */(formData.get(`postText`));

    e.preventDefault();

    if ((postText?.length ?? 0) < 10) {
      toast({
        message: `10 chars or more plz`,
        severity: `warning`
      });
    }
    else {
      // TODO: standardize on passing FormData objects?
      onSubmit(postText);
    }
  }, [ onSubmit ]);
  /** @type {import('preact/hooks').Ref<HTMLFormElement>} */
  const formRef = useRef(null);

  useEffect(function onMount() {
    formRef.current?.querySelector(`textarea`)?.focus();
  }, []);

  return {
    ...props,
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
    formRef,
    onCancel,
    onSubmitEdit,
    onTogglePreview,
    post,
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
        ref={formRef}
        onSubmit={onSubmitEdit}
      >
        <MarkdownPreviewPane
          className={styles.markdownPreviewPane}
          initialValue={post?.text}
          name="postText"
          onChange={onSubmitEdit}
          previewMode={previewMode}
        />
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
