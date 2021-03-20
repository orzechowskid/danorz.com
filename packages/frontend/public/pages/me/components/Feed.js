import * as types from '~/types.js';

import {
  useGetData
} from '~/utils/useRemoteData.js';

/** @type {types.Component<undefined>} */
function Feed() {
  /** @type {types.RemoteData<types.BlogPost>} */
  const posts = useGetData(`my/posts`);

  return (
    <>
      <div>{posts.metadata.error ?? ''}</div>

      {posts?.data.map(
        (post) => (
          <div key={post._id} {...post} />
        )
      ) ?? ''}
    </>
  );
}

export default Feed;
