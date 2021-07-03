import Markdown from '~/components/Markdown.js';
import Restricted from '~/components/Restricted.js';
import {
  gravatarHashToUrl
} from '~/utils/helpers.js';
import {
  useI18n
} from '~/utils/useI18n.js';

import styles from './Comments.module.css';

/**
 * @param {import('~/t').BlogPostComment} props
 */
function useSingleComment(props) {
  const {
    date,
    t,
    time
  } = useI18n();
  const timestamp = props.timestamp
    ? new Date(props.timestamp)
    : new Date();

  return {
    ...props,
    t,
    timestamp,
    timeString: `${time(timestamp)} ${date(timestamp)}`
  };
}

/** @type {import('~/t').Component<import('~/t').BlogPostComment>} */
function SingleComment(props) {
  const {
    gravatarHash,
    name,
    t,
    text,
    timestamp,
    timeString
  } = useSingleComment(props);

  return (
    <article className={styles.comment}>
      <header>
        <span>
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
            {timeString}
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
    comments = [],
    onAddComment
  } = props;
  const {
    num,
    t
  } = useI18n();

  return (
    <section className={styles.comments}>
      <h3 className={styles.commentsHeader}>
        {t(`BlogPost:comment-counter`, {
          commentCount: num(comments.length)
        })}
      </h3>

      {comments.map(
        (c) => <SingleComment key={c._id} {...c} />
      )}

      <Restricted ifSiteSettingEnabled="blog.allowComments">
        <button onClick={onAddComment}>add comment</button>
      </Restricted>
    </section>
  );
}

export default Comments;
