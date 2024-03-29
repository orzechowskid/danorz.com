import {
  useI18n
} from '~/utils/useI18n.js';

import styles from './Byline.module.css';

/**
 * @typedef BylineProps
 * @property {string} [author]
 * @property {string[]} [tags]
 * @property {import('dto').Timestamp} [timestamp]
 */

/** @type {import('~/t').Component<BylineProps>} */
const TagList = function(props) {
  const {
    tags
  } = props;
  const {
    t
  } = useI18n();

  return (
    <ul
      aria-label={t(`BlogPost:tags`)}
      className={styles.tagList}
    >
      {tags?.map((tag) => (
        <li key={tag}>
          <a key={tag} href={`/blog/tags/${tag}`}>{tag}</a>
        </li>
      ))}
    </ul>
  );
}

/** @type {import('~/t').Component<{timestamp?: import('dto').Timestamp}>} */
const Timestamp = (props) => {
  const {
    timestamp
  } = props;
  const {
    date
  } = useI18n();

  if (!timestamp) {
    return <time />;
  }

  return (
    <time dateTime={timestamp}>
      {date(new Date(timestamp))}
    </time>
  );
}

/** @type {import('~/t').Component<BylineProps>} */
const Byline = (props) => {
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

export default Byline;
