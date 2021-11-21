import Heading from '~/components/Heading.js';
import Restricted from '~/components/Restricted.js';
import {
  usePageTitle
} from '~/utils/usePageTitle.js';

import layoutStyles from './Layout.module.css';
import styles from './PageTitleContainer.module.css';

/** @type {Component<PageTitleProps>} */
function PageTitle(props) {
  const {
    title
  } = props;
  const titleString = typeof title === `function`
    ? title()
    : title;
  usePageTitle(titleString);

  return (
    <Heading>{titleString}</Heading>
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

/** @type {Component<PageTitleContainerProps>} */
function PageTitleContainer(props) {
  const {
    children
  } = props;

  return (
    <div className={`${layoutStyles.layout} ${styles.pageTitleContainer}`}>
      {children}
    </div>
  );
}

export {
  PageActions,
  PageTitle
};

export default PageTitleContainer;
