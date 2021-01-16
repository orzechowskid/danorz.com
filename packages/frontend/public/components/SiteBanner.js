import Markdown from 'markdown-to-jsx';
import {
  useEffect
} from 'preact/hooks';

import {
  useGlobalState
} from '~/state/globalState';
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
  const [{
    bannerDismissable,
    bannerId,
    bannerSeverity,
    bannerText,
    dismissed
  }, actions ] = useGlobalState({
    bannerDismissable: selectBannerDismissable,
    bannerId: selectBannerId,
    bannerSeverity: selectBannerSeverity,
    bannerText: selectBannerText,
    dismissed: selectHasDismissedBanner
  }, {
    dismissBanner,
    fetchBanner
  });
  const {
    t
  } = useI18n();
  const className = `${styles.siteBanner} ${styles[bannerSeverity]}`;

  function onDismissBanner() {
    actions.dismissBanner(bannerId);
  }

  useEffect(actions.fetchBanner, []);

  if (!bannerText || dismissed) {
    return null;
  }

  return (
    <div id="site-banner" className={className}>
      <Layout className={styles.bannerContents}>
        <Markdown>{bannerText}</Markdown>

        {bannerDismissable && (
          <button
            aria-label={t(`dismiss {banner}`, { banner: `this thing` })}
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
