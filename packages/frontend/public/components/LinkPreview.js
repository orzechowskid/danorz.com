import {
  useRemoteObject
} from '~/utils/useRemoteData.js';

import styles from './LinkPreview.module.css';

/**
 * @typedef {Object} LinkPreviewProps
 * @property {string} [className]
 * @property {string} url
 */

/** @type {import('~/t').Component<LinkPreviewProps>} */
const LinkPreview = (props) => {
  const {
    url
  } = props;
  const {
    data
  } = useRemoteObject(`linkpreview?url=${encodeURIComponent(url)}`);
  const {
    favicons,
    images,
    title,
    url: linkUrl
  } = data?.metadata ?? {};

  return (
    <div className={styles.linkPreview}>
      <a
        href={linkUrl}
        rel="noopener noreferrer"
        target="_blank"
      >
        <span className={styles.title}>
          {title}
        </span>
        <img
          alt={title}
          className={styles.media}
          src={images?.[0]}
        />
        <span
          className={styles.url}
          role="presentation"
        >
          {url}
        </span>
        <img
          className={styles.logo}
          role="presentation"
          src={favicons?.[0]}
        />
      </a>
    </div>
  );
}

export default LinkPreview;
