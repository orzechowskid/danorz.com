import {
  useCallback,
  useEffect,
  useState
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
  useGlobalErrorToast
} from '~/utils/useGlobalErrorToast.js';
import {
  useI18n
} from '~/utils/useI18n.js';
import {
  usePageLoadTracker
} from '~/utils/usePageLoadTracker.js';
import {
  usePageMeta
} from '~/utils/usePageTitle.js';
import AddCommentDialog from './components/AddCommentDialog.js';
import Byline from './components/Byline.js';
import Comments from './components/Comments.js';
import EditPostDialog from './components/EditPostDialog.js';
import {
  useBlogPost
} from './utils/useBlogPost.js';

import layoutStyles from '../../components/Layout.module.css';
import styles from './post.module.css';

function useBlogPostPage() {
  const {
    path
  } = useLocation();
  const {
    t
  } = useI18n();
  const postId = path?.split(`/`).pop();
  const {
    busy,
    createComment,
    data,
    deleteComment,
    error,
    updateComment,
    updatePost
  } = useBlogPost({
    postId
  });
  const {
    errorToast
  } = useGlobalErrorToast();
  const ready = !busy;
  const [editMode, setEditMode] = useState(
    /** @type {() => boolean} */
    () => false
  );
  const onEdit = useCallback(() => setEditMode(true), []);
  const onEditCancel = useCallback(
    function onEditCancel() {
      setEditMode(false);
    }, []
  );
  const onEditSubmit = useCallback(
    function onEditSubmit() {
      setEditMode(false);
    }, []
  );
  const [addCommentMode, setAddCommentMode] = useState(
    /** @type {() => boolean} */
    () => false
  );
  const onAddComment = useCallback(() => setAddCommentMode(true), []);
  const onAddCommentCancel = useCallback(
    function onAddCommentCancel() {
      setAddCommentMode(false);
    }, []
  );
  const onAddCommentSubmit = useCallback(
    function onAddCommentSubmit() {
      setAddCommentMode(false);
    }, []
  );

  usePageMeta(function setPageMeta() {
    return {
      description: t(`BlogPost:description`)
    };
  }, [ t ]);
  usePageLoadTracker([ ready ]);
  useEffect(function showError() {
    if (error) {
      errorToast(error);
    }
  }, [error]);

  return {
    addCommentMode,
    createComment,
    data,
    deleteComment,
    editMode,
    onAddComment,
    onAddCommentCancel,
    onAddCommentSubmit,
    onEdit,
    onEditCancel,
    onEditSubmit,
    ready,
    t,
    updateComment,
    updatePost
  };
}

/** @type {import('preact').FunctionComponent<void>} */
const BlogPost = function() {
  const {
    addCommentMode,
    createComment,
    data,
    deleteComment,
    editMode,
    onAddComment,
    onAddCommentCancel,
    onAddCommentSubmit,
    onEdit,
    onEditCancel,
    onEditSubmit,
    ready,
    t,
    updateComment,
    updatePost
  } = useBlogPostPage();
  const {
    author,
    comments,
    tags,
    text,
    title
  } = data ?? {};

  return (
    <Busy.div
      class={`${layoutStyles.layout} ${styles.post}`}
      ready={ready}
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
          initialValue={text}
          onCancel={onEditCancel}
          onSubmit={onEditSubmit}
        />
      )}

      {addCommentMode && (
        <AddCommentDialog
          onCancel={onAddCommentCancel}
          onSubmit={onAddCommentSubmit}
        />
      )}
    </Busy.div>
  );
}

export default BlogPost;
