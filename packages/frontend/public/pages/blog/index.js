import * as types from '~/types';

import {
  useEffect
} from 'preact/hooks';

import {
  firePageView
} from '~/utils/analytics';
import usePageTitle from '~/utils/usePageTitle';
import Feed from './components/Feed';

import layoutStyles from '../../components/Layout.module.css';

/** @type {types.Component<void>} */
function Blog() {
  usePageTitle(function() {
    return `Blog`;
  });

  useEffect(function onMount() {
    firePageView();
  }, []);

  return (
    <div className={layoutStyles.layout}>
      <Feed />
    </div>
  );
}

export default Blog;
