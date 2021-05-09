import Markdown from '~/components/Markdown.js';
import Restricted from '~/components/Restricted.js';
import {
  mongoIdToTimestamp
} from '~/utils/datetime.js';
import {
  gravatarHashToUrl
} from '~/utils/helpers.js';
import {
  useI18n
} from '~/utils/useI18n.js';

import styles from './Comments.module.css';

/** @type {types.Component<types.BlogPostComment>} */
function SingleComment(props) {
  const {
    _id,
    gravatarHash,
    name,
    text
  } = props;
  const {
    date,
    t,
    time
  } = useI18n();
  const timestamp = new Date(mongoIdToTimestamp(_id));

  return (
    <article className={styles.comment}>
      <header>
        <span className={styles.commentIcon}>
          <img
            alt={t(`BlogPost:avatar-alt`)}
            src={gravatarHashToUrl(gravatarHash)}
          />
        </span>
        <div className={styles.commentByline}>
          <div>
            {name}
          </div>
          <time dateTime={timestamp.toISOString()}>
            {time(timestamp)}&nbsp;{date(timestamp)}
          </time>
        </div>
      </header>
      <Markdown className={styles.commentText}>
        {text}
      </Markdown>
    </article>
  );
}

function Comments(props) {
  const {
    comments = []
  } = props;
  const {
    num,
    t
  } = useI18n();

  return (
    <section className={styles.comments}>
      <h3 className={styles.commentsHeader}>
        {t(`BlogPost:comment-counter`, { commentCount: num(comments.length) })}
      </h3>

      {comments.map(
        (c) => <SingleComment key={c._id} {...c} />
      )}

      <Restricted ifSiteSettingEnabled="blog.allowComments">
        <span>add comment</span>
      </Restricted>
    </section>
  );
}

export default Comments;
