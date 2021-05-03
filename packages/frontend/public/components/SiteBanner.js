import Layout from '~/components/Layout.js';
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

function useSiteBanner() {
  /** @type {LocalStorage<BannerInfo>} */
  const {
    data: dismissedBanners,
    update: updateDismissedBanners
  } = useLocalStorage(`site/banner`);
  /** @type {RemoteDataItem<SiteBanner>} */
  const {
    data,
    error
  } = useRemoteData({
    apiEndpoint: `site/banner`
  });
  const {
    _id
  } = data;
  const activeBanner = dismissedBanners?.[_id]
    ? null
    : data;

  function dismissBanner() {
    updateDismissedBanners({ ...dismissedBanners, [_id]: true });
  }

  return {
    data: activeBanner,
    dismissBanner,
    error
  };
}

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
      <Layout className={styles.bannerContents}>
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
      </Layout>
    </div>
  );
}

export default SiteBanner;
