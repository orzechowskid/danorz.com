import * as types from '~/types';

import FeedItem from '~/components/FeedItem';
import {
  useGetData
} from '~/utils/useRemoteData';

/** @type {types.Component<undefined>} */
function Feed() {
  /** @type {types.RemoteData<types.BlogPost>} */
  const posts = useGetData(`my/posts`);

  return (
    <>
      <div>{posts.metadata.error ?? ''}</div>

      {posts?.data.map(
        (post) => (
          <FeedItem key={post._id} {...post} />
        )
      ) ?? ''}
    </>
  );
}

export default Feed;
