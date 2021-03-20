import * as types from '~/types.js';

import SinglePost from './SinglePost.js';

import styles from './Feed.module.css';

/**
 * @typedef {Object} FeedProps
 * @property {types.BlogPost[]} posts
 */

/** @type {types.Component<FeedProps>} */
function Feed(props) {
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
