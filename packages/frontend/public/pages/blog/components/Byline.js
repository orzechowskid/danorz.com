import {
  useI18n
} from '~/utils/useI18n.js';

import styles from './Byline.module.css';

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
      aria-label={t(`BlogPost:tags`)}
      className={styles.tagList}
    >
      {tags?.map(
        (tag) => (
          <li key={tag}>
            <a key={tag} href={`/blog/tag/${tag}`}>{tag}</a>
          </li>
        )
      )}
    </ul>
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
    return <time />;
  }

  return (
    <time dateTime={new Date(timestamp).toISOString()}>
      {date(timestamp)}
    </time>
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

export default Byline;
