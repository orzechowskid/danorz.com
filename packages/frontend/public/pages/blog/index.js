import Busy from '~/components/Busy.js';
import Heading from '~/components/Heading.js';
import LinkButton from '~/components/LinkButton.js';
import Markdown from '~/components/Markdown.js';
import PageTitle from '~/components/PageTitle.js';
import Section from '~/components/Section.js';
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
  useRemoteCollection
} from '~/utils/useRemoteData.js';
import Byline from './components/Byline.js';

import layoutStyles from '~/components/Layout.module.css';
import styles from './index.module.css';

function useBlogPage() {
  /** @type {import('~/t').RemoteCollection<import('dto').BlogPost>} */
  const {
    busy,
    data
  } = useRemoteCollection(`blog/posts`);
  const {
    t
  } = useI18n();
  const page = `Blog`;
  const pageTitle = t(`${page}:title`);
  const ready = !busy;

  usePageMeta(function setPageMeta() {
    return {
      description: t(`Blog:description`)
    };
  }, [ t ]);
  usePageLoadTracker([ ready ]);

  return {
    data,
    pageTitle,
    ready,
    t
  }
}

/** @type {import('~/t').Component<{}>} */
function Blog() {
  const {
    data,
    pageTitle,
    ready,
    t
  } = useBlogPage();

  return (
    <Busy.div
      class={`${layoutStyles.layout} ${styles.page}`}
      ready={ready}
      role="feed"
    >
      <PageTitle>
        {pageTitle}
      </PageTitle>

      {data?.map((post) => (
        <Section
          as="article"
          key={post._id}
        >
          <header>
            <Heading>
              <a
                aria-label={t(`BlogPost:title-link`)}
                className="unstyled"
                href={`/blog/posts/${post._id}`}
              >
                {post.title}
              </a>
            </Heading>
            <Byline author={post.author} tags={post.tags} timestamp={new Date()} />
          </header>
          <Markdown>
            {post.text}
          </Markdown>
          <footer>
            <a
              aria-label={t(`BlogPost:comment-link`)}
              href={`blog/posts/${post._id}#comments`}
            >
              {t(`BlogPost:comment-counter`, {
                commentCount: post.comments.length
              })}
            </a>
          </footer>
        </Section>
      ))}
    </Busy.div>
  );
}

export default Blog;
