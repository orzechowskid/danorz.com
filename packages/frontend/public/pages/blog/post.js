import * as types from '~/types';

import {
  useLoc
} from 'preact-iso/router';

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
import SinglePost from './components/SinglePost';

import layoutStyles from '../../components/Layout.module.css';

function BlogPost() {
  const {
    path
  } = useLoc();
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
