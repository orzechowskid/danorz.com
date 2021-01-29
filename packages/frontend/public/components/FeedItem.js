import * as types from '~/types';

import Markdown from '~/components/Markdown';
import {
  mongoIdToTimestamp
} from '~/utils/datetime';
import {
  useI18n
} from '~/utils/useI18n';

import styles from './FeedItem.module.css';

/** @type {types.Component<{tags: string[]}>} */
function TagList(props) {
  const {
    tags
  } = props;

  return (
    <ul className={styles.tagList}>
      {tags.map(
        (t) => (
          <li key={t}>
            <a key={t} href={`/blog/tag/${t}`}>{t}</a>
          </li>
        )
      )}
    </ul>
  );
}

/** @type {types.Component<types.BlogPost>} */
function FeedItem(props) {
  const {
    _id,
    author,
    tags = [],
    text,
    title
  } = props;
  const {
    date
  } = useI18n();

  return (
    <article className={styles.feedItem}>
      <header>
        <h2>{title}</h2>
        <h3 className={styles.byline}>
          <address>{author}</address>
          <span> - </span>
          <span>{date(mongoIdToTimestamp(_id).getTime())}</span>
          <span> - </span>
          <TagList tags={tags} />
        </h3>
      </header>
      <Markdown>
        {text}
      </Markdown>
    </article>
  );
}

export default FeedItem;
