import Heading from '~/components/Heading.js';
import {
  usePageMeta,
  usePageTitle
} from '~/utils/usePageTitle.js';

/**
 * @typedef PageTitleProps
 * @property {string} children
 */

/** @type {import('~/t').Component<PageTitleProps>} */
const PageTitle = (props) => {
  const {
    children
  } = props;
  usePageTitle(children);

  return (
    <Heading at-only>
      {children}
    </Heading>
  );
};

export default PageTitle;
