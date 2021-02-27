import * as types from '~/types';

import Busy from '~/components/Busy';
import {
  usePageLoadTracker
} from '~/utils/usePageLoadTracker';
import {
  usePageMeta,
  usePageTitle
} from '~/utils/usePageTitle';
import {
  useGetData
} from '~/utils/useRemoteData';
import Feed from './components/Feed';

import styles from './index.module.css';
import layoutStyles from '../../components/Layout.module.css';

/** @type {types.Component<void>} */
function Blog() {
  /** @type {types.RemoteData<types.BlogPost>} */
  const posts = useGetData(`blog/posts`);

  usePageMeta({
    description: `blog post`
  });
  usePageTitle(function() {
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
