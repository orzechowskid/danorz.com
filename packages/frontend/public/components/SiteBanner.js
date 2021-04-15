import Markdown from 'markdown-to-jsx';
import {
  useEffect
} from 'preact/hooks';

import * as types from '~/types.js';

import {
  setStoredValue
} from '~/utils/localStorage.js';
import {
  useActionCreators,
  useSelectors
} from '~/utils/useGlobalState.js';
import {
  selectBannerDismissable,
  selectBannerId,
  selectBannerSeverity,
  selectBannerText,
  selectDismissedBanners,
  selectHasDismissedBanner
} from '~/state/banner.js';
import {
  useI18n
} from '~/utils/useI18n.js';
import Layout from './Layout.js';

import styles from './SiteBanner.module.css';

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

  setStoredValue(`dismissedBanners`, [ ...dismissedBanners, bannerId ]);

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
