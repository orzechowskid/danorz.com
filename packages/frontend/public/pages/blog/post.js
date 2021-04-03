import {
  useEffect,
  useState
} from 'preact/hooks';
import {
  useLocation
} from 'preact-iso/router';

import * as types from '~/types.js';

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
  usePageMeta,
  usePageTitle
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
  /** @type {types.RemoteDataResult<types.BlogPost>} */
  const {
    data,
    ready
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
  /** @type {types.LocalState<string[]>} */
  const [ postTags, setPostTags ] = useState(tags);
  /** @type {types.LocalState<string>} */
  const [ postText, setPostText ] = useState(text);
  /** @type {types.LocalState<string>} */
  const [ postTitle, setPostTitle ] = useState(title);
  /** @type {types.LocalState<boolean>} */
  const [ editMode, setEditMode ] = useState(false);

  useEffect(function onData() {
    setPostTags(tags);
    setPostText(text);
    setPostTitle(title);
  }, [ data[0] ]);

  usePageMeta(function setPageMeta() {
    return {
      description: t(`BlogPost:description`)
    };
  }, [ t ]);
  usePageTitle(function setTitle() {
    return postTitle;
  }, [ postTitle ]);
  usePageLoadTracker([ ready ]);

  return (
    <div
      aria-busy={!ready}
      className={`${layoutStyles.layout} ${styles.post} ${busyStyles.busy}`}
    >
      <form>
        <PageTitleContainer>
          <PageTitle>
            {editMode ? (
              <input type="text" value={postTitle} />
            ) : (
              postTitle
            )}
          </PageTitle>
          <PageActions>
            <LinkButton
              key="e"
            >
              <span>{t(`PageActions:edit-button`)}</span>
            </LinkButton>
          </PageActions>
        </PageTitleContainer>
        <section>
          <header>
            <Byline
              author={author}
              tags={postTags}
              timestamp={mongoIdToTimestamp(_id)}
            />
          </header>
          <a href="#comments">skip to comments</a>
          <Markdown>
            {postText}
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
