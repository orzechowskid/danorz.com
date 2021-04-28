import * as types from '~/types.js';

import PageTitleContainer, {
  PageTitle
} from '~/components/PageTitleContainer.js';
import {
  useI18n
} from '~/utils/useI18n.js';
import {
  useRemoteData
} from '~/utils/useRemoteData.js';

import CollapsibleSection from './components/CollapsibleSection.js';

import layoutStyles from '~/components/Layout.module.css';
//import styles from './index.module.css';
const styles = {};

/** @type {types.Component<void>} */
function Settings() {
  /** @type {types.RemoteDataResult<types.BlogPost>} */
  const {
    data,
    //    doUpdate,
    //    localError,
    metadata,
    ready
  } = useRemoteData({
    apiEndpoint: `my/settings/site`
  });
  const {
    t
  } = useI18n();
  const page = `Settings`;
  const pageTitle = t(`${page}:title`);

  const data2 = {
    blog: {
      allowComments: true
    },
    content: {
      about: {
        private: false
      }
    }
  };

  return (
    <div
      aria-busy={!ready}
      className={`${styles.page} ${layoutStyles.layout}`}
    >
      <PageTitleContainer>
        <PageTitle title={pageTitle} />
      </PageTitleContainer>
      {Object.keys(data2).map((k) => (
        <CollapsibleSection
          key={k}
          data={data2[k]}
          level={3}
          namespace={k}
        />
      ))}
    </div>
  );
}

export default Settings;
