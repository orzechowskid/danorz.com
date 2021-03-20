import * as types from '~/types';

import Markdown from '~/components/Markdown.js';
import PageTitleContainer from '~/components/PageTitleContainer.js';
import {
  unwrap
} from '~/utils/api.js';
import {
  useI18n
} from '~/utils/useI18n.js';
import {
  usePageMeta,
  usePageTitle
} from '~/utils/usePageTitle.js';
import {
  useRemoteData
} from '~/utils/useRemoteData.js';

import layoutStyles from '~/components/Layout.module.css';

function About() {
  const {
    t
  } = useI18n();
  const {
    error,
    result
  } = useRemoteData({
    apiEndpoint: `content/bio`
  });
  const pageTitle = t(`About:title`);

  usePageTitle(function setPageTitle() {
    return pageTitle;
  }, [ pageTitle ]);
  usePageMeta(function setPageMetaTags() {
    return {
      description: `about me`
    }
  }, []);

  return (
    <div className={`${layoutStyles.layout}`}>
      <PageTitleContainer title={pageTitle} />
      <Markdown>{unwrap(result)?.text}</Markdown>
    </div>
  );
}

export default About;
