import {
  useCallback,
  useEffect,
  useState
} from 'preact/hooks';
import {
  useLocation
} from 'preact-iso';

import Busy from '~/components/Busy.js';
import Heading from '~/components/Heading.js';
import Markdown from '~/components/Markdown.js';
import PageTitle from '~/components/PageTitle.js';
import {
  useGlobalToast
} from '~/utils/useGlobalToast.js';
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
  useSession
} from '~/utils/useSession.js';
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
    toast
  } = useGlobalToast();
  const {
    isSignedIn
  } = useSession();
  const ready = !busy;
  const [ editMode, setEditMode ] = useState(false);
  const onEdit = useCallback(() => setEditMode(true), []);
  const onEditCancel = useCallback(
    function onEditCancel() {
      setEditMode(false);
    }, []
  );
  const onEditSubmit = useCallback(
    /** @param {import('dto').BlogPost} updatedPost */
    async function onEditSubmit(updatedPost) {
      try {
        updatePost(updatedPost);
        setEditMode(false);
        throw new Error('no.');
      }
      catch (ex) {
        toast({
          message: ex.message,
          severity: `error`
        });
      }
    }, []
  );
  const [ addCommentMode, setAddCommentMode ] = useState(false);
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
  useEffect(function onError() {
    if (error) {
      toast({
        message: error.message,
        severity: `error`
      });
    }
  }, [ error ]);

  return {
    addCommentMode,
    createComment,
    data,
    deleteComment,
    editMode,
    isSignedIn,
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

/** @type {import('~/t').Component<{}>} */
const BlogPost = function() {
  const {
    addCommentMode,
    data,
    editMode,
    isSignedIn,
    onAddComment,
    onAddCommentCancel,
    onAddCommentSubmit,
    onEdit,
    onEditCancel,
    onEditSubmit,
    ready,
    t
  } = useBlogPostPage();

  return (
    <Busy.div
      class={`${layoutStyles.layout} ${styles.post}`}
      ready={ready}
    >
      <PageTitle>danorz.com - blog</PageTitle>
      <form>
        <section>
          <Heading>{data?.title}</Heading>
          <header>
            <Byline
              author={data?.author}
              tags={data?.tags}
              timestamp={new Date().toISOString()}
            />
          </header>
          <div>
            <a href="#comments">{t(`BlogPost:skip-to-comments`)}</a>
            {isSignedIn && (
              <button
                onClick={onEdit}
                type="button"
              >
                {t(`BlogPost:edit`)}
              </button>
            )}
          </div>
          <Markdown>
            {data?.text}
          </Markdown>
          <footer id="comments">
            <Comments
              comments={data.comments}
              onAddComment={onAddComment}
            />
          </footer>
        </section>
      </form>

      {editMode && (
        <EditPostDialog
          onCancel={onEditCancel}
          onSubmit={onEditSubmit}
          /* have to have a full post loaded if we're editing something */
          post={/** @type {import('dto').BlogPost} */(data)}
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
