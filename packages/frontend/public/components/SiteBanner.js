import Markdown from '~/components/Markdown.js';
import {
  useI18n
} from '~/utils/useI18n.js';
import {
  useLocalStorage
} from '~/utils/useLocalStorage.js';
import {
  useRemoteData
} from '~/utils/useRemoteData.js';

import styles from './SiteBanner.module.css';
import layoutStyles from './Layout.module.css';

/** @typedef {'info' | 'warning'} BannerSeverity */
/**
 * @typedef {Object} SiteBannerData
 * @property {BannerSeverity} bannerSeverity
 * @property {string} bannerText
 * @property {boolean} dismissed
 */

function useSiteBanner() {
  const {
    data: dismissedBanners,
    update: updateDismissedBanners
  } = useLocalStorage(`site/banner`);
  /** @type {import('~/utils/useRemoteData').RemoteData<SiteBannerData>} */
  const {
    data,
    error
  } = useRemoteData({
    apiEndpoint: `site/banner`,
    opts: {
      /* checking for a banner more than once a minute seems wasteful */
      dedupingInterval: 60000,
      revalidateOnFocus: false
    }
  });
  const {
    _id
  } = data;
  const activeBanner = dismissedBanners?.[_id]
    ? null
    : data;

  function dismissBanner() {
    updateDismissedBanners({
      ...dismissedBanners, [_id]: true
    });
  }

  return {
    data: activeBanner,
    dismissBanner,
    error
  };
}

/** @type {import('preact').FunctionComponent<void>} */
function SiteBanner() {
  const {
    data,
    dismissBanner
  } = useSiteBanner();
  const {
    _id,
    bannerDismissable,
    bannerSeverity,
    bannerText,
    dismissed
  } = data;
  const {
    t
  } = useI18n();

  if (!data || dismissed) {
    return null;
  }

  return (
    <div
      className={styles.siteBanner}
      data-severity={bannerSeverity}
      id="site-banner"
    >
      <div className={`${layoutStyles.layout} ${styles.bannerContents}`}>
        <Markdown>{bannerText}</Markdown>

        {bannerDismissable && (
          <button
            aria-label={t(`SiteBanner:dismiss`)}
            className={styles.dismissTrigger}
            onClick={dismissBanner}
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
}

export default SiteBanner;
