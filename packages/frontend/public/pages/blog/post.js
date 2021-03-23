import {
  useLocation
} from 'preact-iso/router';

import * as types from '~/types.js';

import Busy from '~/components/Busy.js';
import {
  useI18n
} from '~/utils/useI18n.js';
import {
  usePageLoadTracker
} from '~/utils/usePageLoadTracker.js';
import {
  usePageMeta,
  usePageTitle
} from '~/utils/usePageTitle.js';
import {
  useRemoteData
} from '~/utils/useRemoteData.js';
import SinglePost from './components/SinglePost.js';

import layoutStyles from '../../components/Layout.module.css';

function BlogPost() {
  const {
    path
  } = useLocation();
  const {
    t
  } = useI18n();
  /** @type {types.RemoteDataResult<types.BlogPost>} */
  const {
    data,
    localError,
    metadata
  } = useRemoteData({
    apiEndpoint: path.slice(1)
  });

  usePageMeta(function setPageMeta() {
    return {
      description: t(`BlogPost:description`)
    };
  }, [ t ]);
  usePageTitle(function setTitle() {
    return data[0]?.title
      ?? t(`BlogPost:description`);
  }, [ data, t ]);
  usePageLoadTracker([ metadata.count !== undefined ]);

  return (
    <div className={layoutStyles.layout}>
      {data[0] ? (
        <SinglePost
          full
          {...data[0]}
        />
      ) : (
        <Busy />
      )}
    </div>
  );
}

export default BlogPost;
