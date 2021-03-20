import LinkButton from '~/components/LinkButton';
import {
  useI18n
} from '~/utils/useI18n';

import styles from './PageTitleContainer.module.css';

/**
 * @typedef {Object} PageTitleContainerProps
 * @property {() => void} onEdit
 * @property {string} title
 */

/** @type {types.Component<PageTitleContainerProps>} */
function PageTitleContainer(props) {
  const {
    onEdit,
    title
  } = props;
  const {
    t
  } = useI18n();

  return (
    <div className={styles.pageTitleContainer}>
      <h2 className={styles.pageTitle}>{title}</h2>
      <LinkButton
        className={styles.editButton}
        onClick={onEdit}
      >
        {t(`EditButton:title`)}
      </LinkButton>
    </div>
  );
}

export default PageTitleContainer;
