import {
  useLocation
} from 'preact-iso/router';

import * as types from '~/types.js';

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
  usePageMeta,
  usePageTitle
} from '~/utils/usePageTitle.js';
import {
  useRemoteData
} from '~/utils/useRemoteData.js';
import Byline from './components/Byline.js';
import Comments from './components/Comments.js';

import layoutStyles from '../../components/Layout.module.css';
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
    localError,
    metadata
  } = useRemoteData({
    apiEndpoint: path.slice(1)
  });

  usePageMeta(function setPageMeta() {
    return {
      description: t(`BlogPost:description`)
    };
  }, [ t ]);
  usePageTitle(function setTitle() {
    return data[0]?.title
      ?? t(`BlogPost:description`);
  }, [ data, t ]);
  usePageLoadTracker([ metadata.count !== undefined ]);

  return (
    <div className={`${layoutStyles.layout} ${styles.post}`}>
      {!data[0] ? (
        <Busy />
      ) : (
        <>
          <PageTitleContainer>
            <PageTitle>
              {data[0].title}
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
              <Byline author={data[0].author} tags={data[0].tags} timestamp={mongoIdToTimestamp(data[0]._id)} />
            </header>
            <Markdown>
              {data[0].text}
            </Markdown>
            <footer>
              <Comments comments={data[0].comments} />
            </footer>
          </section>
        </>
      )}
    </div>
  );
}

export default BlogPost;
