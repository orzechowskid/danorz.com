import * as types from '~/types.js';

import Restricted from '~/components/Restricted.js';
import {
  usePageTitle
} from '~/utils/usePageTitle.js';

import styles from './PageTitleContainer.module.css';

/**
 * @typedef {Object} PageTitleProps
 * @property {string | (() => string)} title
 */

/** @type {types.Component<PageTitleProps>} */
function PageTitle(props) {
  const {
    title
  } = props;
  const titleString = typeof title === `function`
    ? title()
    : title;
  usePageTitle(titleString);

  return (
    <h2>{titleString}</h2>
  );
}

function PageActions(props) {
  const {
    children
  } = props;

  return (
    <div aria-live="polite">
      <Restricted ifSignedIn>
        {children}
      </Restricted>
    </div>
  );
}

/** @type {types.Component<PageTitleContainerProps>} */
function PageTitleContainer(props) {
  const {
    children
  } = props;

  return (
    <div className={styles.pageTitleContainer}>
      {children}
    </div>
  );
}

export {
  PageActions,
  PageTitle
};

export default PageTitleContainer;
