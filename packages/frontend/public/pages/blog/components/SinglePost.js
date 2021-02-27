import * as types from '~/types';

import Markdown from '~/components/Markdown';
import {
  mongoIdToTimestamp
} from '~/utils/datetime';
import {
  gravatarHashToUrl
} from '~/utils/helpers';
import {
  useI18n
} from '~/utils/useI18n';

import styles from './SinglePost.module.css';

/** @type {types.Component<{tags: string[]}>} */
function TagList(props) {
  const {
    tags
  } = props;
  const {
    t
  } = useI18n();

  return (
    <ul
      aria-label={t(`tags`)}
      className={styles.tagList}
    >
      {tags.map(
        (tag) => (
          <li key={tag}>
            <a key={tag} href={`/blog/tag/${tag}`}>{tag}</a>
          </li>
        )
      )}
    </ul>
  );
}

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
    time
  } = useI18n();
  const timestamp = new Date(mongoIdToTimestamp(_id));

  return (
    <section className={styles.comment}>
      <span className={styles.commentIcon}>
        <img
          alt=""
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
      <Markdown className={styles.commentText}>
        {text}
      </Markdown>
    </section>
  );
}

/** @type {types.Component<{comments: [types.BlogPostComment]}>} */
function Comments(props) {
  const {
    comments = []
  } = props;
  const {
    num,
    t
  } = useI18n();

  return (
    <>
      <h3 className={styles.commentsHeader}>
        {t(`{numComments, plural, =1 {# comment} other {# comments} }`, { numComments: num(comments.length) })}
      </h3>

      <ol className={styles.comments}>
        {comments?.map(
          (c) => (
            <li key={c._id}>
              <SingleComment {...c} />
            </li>
          )
        )}
      </ol>
    </>
  );
}

function Byline(props) {
  const {
    author,
    tags,
    timestamp
  } = props;

  return (
    <div className={styles.byline}>
      <address>{author}</address>
      <span> &ndash; </span>
      <Timestamp timestamp={timestamp} />
      <span> &ndash; </span>
      <TagList tags={tags} />
    </div>
  );
}

function Timestamp(props) {
  const {
    timestamp
  } = props;
  const {
    date
  } = useI18n();

  if (!timestamp) {
    return (
      <time />
    );
  }

  return (
    <time dateTime={timestamp ? new Date(timestamp).toISOString() : undefined}>
      {date(timestamp)}
    </time>
  );
}

/** @type {types.Component<types.BlogPost>} */
function FeedItem(props) {
  const {
    full,
    item
  } = props;
  const {
    _id,
    author,
    comments = [],
    tags = [],
    text,
    title
  } = item;
  const {
    num,
    t
  } = useI18n();

  return (
    <article className={styles.feedItem}>
      <header>
        <h2>{title}</h2>
        <Byline author={author} tags={tags} timestamp={mongoIdToTimestamp(_id)} />
      </header>
      <Markdown>
        {text}
      </Markdown>
      {full
        ? (
          <footer id="comments">
            <Comments comments={comments} />
          </footer>
        ) : (
          <a href={`/blog/posts/${_id}#comments`}>{t(`{numComments, plural, =1 {# comment} other {# comments} }`, { numComments: num(comments.length) })}</a>
        )}
    </article>
  );
}

export default FeedItem;
