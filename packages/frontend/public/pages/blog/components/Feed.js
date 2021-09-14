import SinglePost from './SinglePost.js';

import styles from './Feed.module.css';

/**
 * @typedef {Object} FeedProps
 * @property {import('~/t').BlogPost[]} posts
 */

/** @type {import('~/t').Component<FeedProps>} */
const Feed = (props) => {
  const {
    posts
  } = props;

  return (
    <div className={styles.feed}>
      {posts?.map(
        (post) => (
          <SinglePost
            key={post._id}
            item={post}
          />
        )
      )}
    </div>
  );
}

export default Feed;
