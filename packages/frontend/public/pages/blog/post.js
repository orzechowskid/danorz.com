import {
  useCallback,
  useEffect
} from 'preact/hooks';
import {
  useLocation
} from 'preact-iso/router';

import Busy from '~/components/Busy.js';
import LinkButton from '~/components/LinkButton.js';
import Markdown from '~/components/Markdown.js';
import PageTitleContainer, {
  PageActions,
  PageTitle
} from '~/components/PageTitleContainer.js';
import {
  useI18n
} from '~/utils/useI18n.js';
import {
  usePageLoadTracker
} from '~/utils/usePageLoadTracker.js';
import {
  usePageMeta
} from '~/utils/usePageTitle.js';
import {
  useToggle
} from '~/utils/useToggle.js';
import AddCommentDialog from './components/AddCommentDialog.js';
import Byline from './components/Byline.js';
import Comments from './components/Comments.js';
import EditPostDialog from './components/EditPostDialog.js';
import {
  useBlogPost
} from './utils/useBlogPost.js';

import layoutStyles from '~/components/Layout.module.css';
import styles from './post.module.css';

function useBlogPostPage() {
  const {
    path
  } = useLocation();
  const {
    t
  } = useI18n();
  const postId = path.split(`/`).pop();
  const {
    createComment,
    data,
    editPost
  } = useBlogPost({
    id: postId
  });
  const {
    disable: disableEditMode,
    enable: enableEditMode,
    on: editMode
  } = useToggle(false);
  const {
    disable: disableAddCommentMode,
    enable: enableAddCommentMode,
    on: addCommentMode
  } = useToggle(false);
  const onEdit = useCallback(function onEdit(e) {
    e.preventDefault();
    enableEditMode();
  }, [ ]);
  const onAddComment = useCallback(function onAddComment(e) {
    e.preventDefault();
    enableAddCommentMode();
  }, []);
  const onCancelAddComment = useCallback(function onCancelAddComment() {
    disableAddCommentMode();
  }, [ disableAddCommentMode ]);
  const onCancelEdit = useCallback(function onCancelEdit() {
    disableEditMode();
  }, [ disableEditMode ]);

  useEffect(function handleSubmitCommentStateChange() {
    if (createComment.state === `success`) {
      disableAddCommentMode();
    }
  }, [ disableAddCommentMode, createComment.state ]);

  useEffect(function handleSubmitEditStateChange() {
    if (editPost.state === `success`) {
      disableEditMode();
    }
  }, [ disableEditMode, editPost.state ]);

  usePageMeta(function setPageMeta() {
    return {
      description: t(`BlogPost:description`)
    };
  }, [ t ]);
  usePageLoadTracker([ !!data ]);

  return {
    addCommentError: createComment.error,
    addCommentMode,
    data,
    disableEditMode,
    editMode,
    editPostError: editPost.error,
    onAddComment,
    onCancelAddComment,
    onCancelEdit,
    onEdit,
    onSubmitComment: createComment.execute,
    onSubmitEdit: editPost.execute,
    t
  };
}

/** @type {import('preact').FunctionComponent<void>} */
const BlogPost = function() {
  const {
    addCommentMode,
    data,
    editMode,
    editPostError,
    error,
    onAddComment,
    onCancelAddComment,
    onCancelEdit,
    onEdit,
    onSubmitComment,
    onSubmitEdit,
    t
  } = useBlogPostPage();
  const {
    _id,
    author,
    comments,
    tags,
    text,
    title
  } = data ?? {};

  return (
    <Busy
      className={`${layoutStyles.layout} ${styles.post}`}
      ready={!!data || !!error}
    >
      <form>
        <PageTitleContainer>
          <PageTitle title={title} />
          <PageActions>
            <LinkButton
              key="e"
              onClick={onEdit}
            >
              <span>{t(`PageActions:edit-button`)}</span>
            </LinkButton>
          </PageActions>
        </PageTitleContainer>
        <section>
          <header>
            <Byline
              author={author}
              tags={tags}
              timestamp={new Date("1981-11-28T00:00:00Z")}
            />
          </header>
          <a href="#comments">{t(`BlogPost:skip-to-comments`)}</a>
          <Markdown>
            {text}
          </Markdown>
          <footer id="comments">
            <Comments
              comments={comments}
              onAddComment={onAddComment}
            />
          </footer>
        </section>
      </form>

      {editMode && (
        <EditPostDialog
          error={editPostError}
          initialValue={text}
          onCancel={onCancelEdit}
          onSubmit={onSubmitEdit}
        />
      )}

      {addCommentMode && (
        <AddCommentDialog
          onCancel={onCancelAddComment}
          onSubmit={onSubmitComment}
        />
      )}
    </Busy>
  );
}

export default BlogPost;
