import {
  usePageTitle
} from '~/utils/usePageTitle';

import layoutStyles from '~/components/Layout.module.css';

function NotFound() {
  usePageTitle(function() {
    return `Page not found`;
  }, []);

  return (
    <div className={layoutStyles.layout}>404</div>
  );
}

export default NotFound;
