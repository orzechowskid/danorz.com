import * as types from '~/types';

import FeedItem from '~/components/FeedItem';
import {
  useGetData
} from '~/utils/useRemoteData';

import styles from './Feed.module.css';

/** @type {types.Component<undefined>} */
function Feed() {
  /** @type {types.RemoteData<types.BlogPost>} */
  const posts = useGetData(`blog/posts`);

  return (
    <>
      <div>{posts?.metadata.error}</div>

      <div className={styles.feed}>
        {posts?.data.map(
          (post) => (
            <FeedItem key={post._id} {...post} />
          )
        )}
      </div>
    </>
  );
}

export default Feed;
