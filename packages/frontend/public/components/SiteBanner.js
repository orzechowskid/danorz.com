import Markdown from '~/components/Markdown.js';
import {
  useI18n
} from '~/utils/useI18n.js';
import {
  useLocalStorage
} from '~/utils/useLocalStorage.js';
import {
  useRemoteObject
} from '~/utils/useRemoteData.js';

import styles from './SiteBanner.module.css';
import layoutStyles from './Layout.module.css';

function useSiteBanner() {
  const {
    data: dismissedBanners,
    update: updateDismissedBanners
  } = useLocalStorage(`site/banner`);
  /** @type {import('~/t').RemoteObject<import('dto').SiteBannerData>} */
  const {
    data,
    error
  } = useRemoteObject(`site/banner`);
  const {
    _id
  } = data ?? {};
  const activeBanner = !_id || dismissedBanners?.[_id]
    ? null
    : data;

  function dismissBanner() {
    updateDismissedBanners({
      ...dismissedBanners,
      /* must exist or else there would be nothing to render or dismiss */
      [/** @type {string} */(_id).toString()]: true
    });
  }

  return {
    data: activeBanner,
    dismissBanner,
    error
  };
}

/** @type {import('~/t').Component<{}>} */
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
  } = data ?? {};
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
