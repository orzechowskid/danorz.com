import {
  useRemoteCollection
} from '~/utils/useRemoteData.js';

/** @type {import('~/t').Component<void>} */
const Feed = () => {
  /** @type {import('~/t').RemoteData<import('~/t').BlogPost>} */
  const posts = useRemoteCollection({
    apiEndpoint: `my/posts`
  });

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
