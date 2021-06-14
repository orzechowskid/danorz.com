import {
  useCallback
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
  mongoIdToTimestamp
} from '~/utils/datetime.js';
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
  useRemoteData
} from '~/utils/useRemoteData.js';
import {
  useToggle
} from '~/utils/useToggle.js';
import AddCommentDialog from './components/AddCommentDialog.js';
import Byline from './components/Byline.js';
import Comments from './components/Comments.js';

import layoutStyles from '~/components/Layout.module.css';
import styles from './post.module.css';

/**
 * @typedef {Object} BlogComment
 * @property {string} _id
 * @property {string} gravatarHash
 * @property {string} name
 * @property {string} text
 */

/**
 * @typedef {Object} BlogPost
 * @property {string} _id
 * @property {string} author
 * @property {BlogComment[]} comments
 * @property {string[]} tags
 * @property {string} text
 * @property {string} title
 */

function useBlogPost() {
  const {
    path
  } = useLocation();
  const {
    t
  } = useI18n();
  /** @type {import('~/utils/useRemoteData').RemoteData<BlogPost>} */
  const {
    data,
    error
  } = useRemoteData({
    apiEndpoint: path.slice(1)
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
  const onCancelAddComment = useCallback(function onCancelAddComment(e) {
    disableAddCommentMode();
  }, []);
  const onSubmitComment = useCallback(function onSubmitComment(e) {
    onCancelAddComment();
  }, [ onCancelAddComment ]);

  usePageMeta(function setPageMeta() {
    return {
      description: t(`BlogPost:description`)
    };
  }, [ t ]);
  usePageLoadTracker([ !!data ]);

  return {
    addCommentMode,
    data: data[0] ?? {},
    disableEditMode,
    editMode,
    error,
    onAddComment,
    onCancelAddComment,
    onEdit,
    onSubmitComment,
    t
  };
}

/** @type {import('preact').FunctionComponent<void>} */
const BlogPost = function() {
  const {
    addCommentMode,
    data,
    error,
    onAddComment,
    onCancelAddComment,
    onEdit,
    onSubmitComment,
    t
  } = useBlogPost();
  const {
    _id,
    author,
    comments,
    tags,
    text,
    title
  } = data;

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
              timestamp={mongoIdToTimestamp(_id)}
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
