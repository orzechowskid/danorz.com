import * as types from '~/types.js';

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

import busyStyles from '~/components/Busy.module.css';
import layoutStyles from '~/components/Layout.module.css';
import styles from './index.module.css';

/** @type {types.Component<void>} */
function Blog() {
  /** @type {types.RemoteDataResult<types.BlogPost>} */
  const {
    data,
    doUpdate,
    localError,
    metadata,
    ready
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
  usePageLoadTracker([ ready ]);

  return (
    <div
      aria-busy={!ready}
      className={`${layoutStyles.layout} ${styles.page} ${busyStyles.busy}`}
      role="feed"
    >
      <PageTitleContainer>
        <PageTitle>
          {pageTitle}
        </PageTitle>
        <PageActions>
          <LinkButton
            key="new-post-action"
          >
            <span>{t(`Blog:new-post-action`)}</span>
          </LinkButton>
        </PageActions>
      </PageTitleContainer>
      {data?.map((post) => (
        <article
          key={post._id}
        >
          <header>
            <h3>
              <a
                aria-label={t(`BlogPost:title-link`)}
                className="unstyled"
                href={`/blog/posts/${post._id}`}
              >
                {post.title}
              </a>
            </h3>
            <Byline author={post.author} tags={post.tags} timestamp={mongoIdToTimestamp(post._id)} />
          </header>
          <Markdown>
            {post.text}
          </Markdown>
          <footer>
            <a
              aria-label={t(`BlogPost:comment-link`)}
              href={`blog/posts/${post._id}#comments`}
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
