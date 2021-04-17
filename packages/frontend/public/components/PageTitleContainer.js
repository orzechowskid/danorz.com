import * as types from '~/types.js';

import {
  selectSignedIn
} from '~/state/session.js';
import {
  useSelectors
} from '~/utils/useGlobalState.js';
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
  console.error(`hello world`);
  usePageTitle(titleString);

  return (
    <h2>{titleString}</h2>
  );
}

function PageActions(props) {
  const {
    children
  } = props;
  const {
    isSignedIn
  } = useSelectors({
    isSignedIn: selectSignedIn
  });

  return (
    <div aria-live="polite">
      {isSignedIn ? children : null}
    </div>
  );
}

/** @type {types.Component<>} */
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
