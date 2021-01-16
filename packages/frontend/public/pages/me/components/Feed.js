import FeedItem from '../../../components/FeedItem';
import {
  useRemoteData
} from '../../../utils/useRemoteData';

import * as types from '../../../types';

/** @type {types.Component<undefined>} */
function Feed() {
  /** @type {types.RemoteData<types.BlogPost>} */
  const posts = useRemoteData(`my/posts`);

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
