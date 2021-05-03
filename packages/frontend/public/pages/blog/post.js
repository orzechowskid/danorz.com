import {
  useCallback,
  useState
} from 'preact/hooks';
import {
  useLocation
} from 'preact-iso/router';

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
import Byline from './components/Byline.js';
import Comments from './components/Comments.js';

import busyStyles from '~/components/Busy.module.css';
import layoutStyles from '~/components/Layout.module.css';
import styles from './post.module.css';

function BlogPost() {
  const {
    path
  } = useLocation();
  const {
    t
  } = useI18n();
  /** @type {RemoteDataItem<BlogPost>} */
  const {
    data,
    error
  } = useRemoteData({
    apiEndpoint: path.slice(1)
  });
  const {
    _id,
    author,
    comments,
    tags,
    text,
    title
  } = data[0] ?? {};
  /** @type {types.LocalState<boolean>} */
  const [ editMode, setEditMode ] = useState(false);
  const onEdit = useCallback(function onEdit(e) {
    e.preventDefault();
    setEditMode(true);
  }, [ ]);

  usePageMeta(function setPageMeta() {
    return {
      description: t(`BlogPost:description`)
    };
  }, [ t ]);
  usePageLoadTracker([ !!data ]);

  return (
    <div
      aria-busy={!data}
      className={`${layoutStyles.layout} ${styles.post} ${busyStyles.busy}`}
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
          <a href="#comments">skip to comments</a>
          <Markdown>
            {text}
          </Markdown>
          <footer id="comments">
            <Comments comments={comments} />
          </footer>
        </section>
      </form>
    </div>
  );
}

export default BlogPost;
