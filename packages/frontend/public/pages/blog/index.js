import * as types from '~/types.js';

import Busy from '~/components/Busy.js';
import {
  usePageLoadTracker
} from '~/utils/usePageLoadTracker.js';
import {
  usePageMeta,
  usePageTitle
} from '~/utils/usePageTitle.js';
import {
  useGetData
} from '~/utils/useRemoteData.js';
import Feed from './components/Feed.js';

import styles from './index.module.css';
import layoutStyles from '../../components/Layout.module.css';

/** @type {types.Component<void>} */
function Blog() {
  /** @type {types.RemoteData<types.BlogPost>} */
  const posts = useGetData(`blog/posts`);

  usePageMeta(function setPageMeta() {
    return {
      description: `latest blog posts`
    };
  }, []);
  usePageTitle(function setPageTitle() {
    return `Blog`;
  }, []);
  usePageLoadTracker([ !!posts?.data ]);

  return (
    <div className={`${layoutStyles.layout} ${styles.page}`}>
      {!posts && (
        <Busy className={styles.busy} />
      )}

      <Feed posts={posts?.data ?? []} />
    </div>
  );
}

export default Blog;
