import Markdown from 'markdown-to-jsx';
import {
  useEffect
} from 'preact/hooks';

import {
  useActionCreators,
  useSelectors
} from '~/utils/useGlobalState';
import {
  selectBannerDismissable,
  selectBannerId,
  selectBannerSeverity,
  selectBannerText,
  selectDismissedBanners,
  selectHasDismissedBanner
} from '~/state/banner';
import {
  useI18n
} from '~/utils/useI18n';
import Layout from './Layout';

import styles from './SiteBanner.module.css';

import * as types from '../types';

/** @type {types.ActionCreator<types.BannerState> */
async function fetchBanner() {
  return {
    banner: {
      dismissable: true,
      id: `1a2b`,
      severity: 'warning',
      text: 'oh damn lookit this'
    }
  };
}

/** @type {types.ActionCreator<types.BannerState>} */
async function dismissBanner(appState, bannerId) {
  const dismissedBanners = selectDismissedBanners(appState);

  localStorage.setItem(`dismissedBanners`, JSON.stringify([ ...dismissedBanners, bannerId ]));

  return {
    banner: {}
  };
}

/** @type {types.Component<undefined>} */
function SiteBanner() {
  const {
    bannerDismissable,
    bannerId,
    bannerSeverity,
    bannerText,
    dismissed
  } = useSelectors({
    bannerDismissable: selectBannerDismissable,
    bannerId: selectBannerId,
    bannerSeverity: selectBannerSeverity,
    bannerText: selectBannerText,
    dismissed: selectHasDismissedBanner
  });
  const actions = useActionCreators({
    dismissBanner,
    fetchBanner
  });
  const {
    t
  } = useI18n();

  function onDismissBanner() {
    actions.dismissBanner(bannerId);
  }

  useEffect(actions.fetchBanner, []);

  if (!bannerText || dismissed) {
    return null;
  }

  return (
    <div
      className={styles.siteBanner}
      data-severity={bannerSeverity}
      id="site-banner"
    >
      <Layout className={styles.bannerContents}>
        <Markdown>{bannerText}</Markdown>

        {bannerDismissable && (
          <button
            aria-label={t(`SiteBanner:dismiss`)}
            className={styles.dismissTrigger}
            onClick={onDismissBanner}
          >
            ×
          </button>
        )}
      </Layout>
    </div>
  );
}

export default SiteBanner;
