import {
  useLocation
} from 'preact-iso/router';

import * as types from '~/types.js';

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
import SinglePost from './components/SinglePost.js';

import layoutStyles from '../../components/Layout.module.css';

function BlogPost() {
  const {
    path
  } = useLocation();
  /** @type {types.RemoteData<types.BlogPost>} */
  const posts = useGetData(path);

  usePageMeta({
    description: `blog post`
  });
  usePageTitle(function setTitle() {
    return posts?.data[0]?.title
      ?? `Blog`;
  }, [ posts ]);
  usePageLoadTracker([ !!posts?.data ]);

  return (
    <div className={layoutStyles.layout}>
      <SinglePost
        full
        item={posts?.data?.[0]}
      />
    </div>
  );
}

export default BlogPost;
