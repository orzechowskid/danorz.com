import * as types from '~/types.js';

import Busy from '~/components/Busy.js';
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
import SinglePost from './components/SinglePost.js';

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
      {data?.map((post) => (
        <SinglePost
          key={post._id}
          {...post}
        />
      ))}
    </div>
  );
}

export default Blog;
