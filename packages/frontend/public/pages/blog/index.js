import * as types from '~/types.js';

import Busy from '~/components/Busy.js';
import LinkButton from '~/components/LinkButton.js';
import Markdown from '~/components/Markdown.js';
import PageTitleContainer, {
  PageActions,
  PageTitle
} from '~/components/PageTitleContainer.js';
import { mongoIdToTimestamp } from '~/utils/datetime.js';
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

import styles from './index.module.css';
import layoutStyles from '../../components/Layout.module.css';

/** @type {types.Component<void>} */
function Blog() {
  /** @type {types.RemoteDataResult<types.BlogPost>} */
  const {
    data,
    doUpdate,
    localError,
    metadata
  } = useRemoteData({
    apiEndpoint: `blog/posts`
  });
  const {
    t
  } = useI18n();
  const page = `Blog`;
  const pageTitle = t(`${page}:title`);
  usePageMeta(function setPageMeta() {
    return {
      description: t(`Blog:description`)
    };
  }, [ t ]);
  usePageTitle(function setPageTitle() {
    return pageTitle;
  }, [ pageTitle ]);
  usePageLoadTracker([ metadata?.total !== undefined ]);
  return (
    <div className={`${layoutStyles.layout} ${styles.page}`}>
      <PageTitleContainer>
        <PageTitle>
          {pageTitle}
        </PageTitle>
        <PageActions>
          <LinkButton
            key="gnu"
          >
            <span>{t(`PageActions:new-button`)}</span>
          </LinkButton>
        </PageActions>
      </PageTitleContainer>
      {!data && <Busy />}
      {data?.map((post) => (
        <article
          key={post._id}
        >
          <header>
            <h3>{post.title}</h3>
            <Byline author={post.author} tags={post.tags} timestamp={mongoIdToTimestamp(post._id)} />
          </header>
          <Markdown>
            {post.text}
          </Markdown>
          <footer>
            <a
              aria-label={t(`BlogPost:comment-link`)}
              href={`blog/posts/${post._id}`}
            >
              {t(`BlogPost:comment-counter`, { commentCount: post.comments.length })}
            </a>
          </footer>
        </article>
      ))}
    </div>
  );
}

export default Blog;
