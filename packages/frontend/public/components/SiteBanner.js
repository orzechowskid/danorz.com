import Markdown from 'markdown-to-jsx';

import * as types from '~/types.js';

import {
  useI18n
} from '~/utils/useI18n.js';
import {
  useSiteBanner
} from '~/utils/useSiteBanner.js';
import Layout from './Layout.js';

import styles from './SiteBanner.module.css';

/** @type {types.Component<undefined>} */
function SiteBanner() {
  const {
    data,
    dismissBanner
  } = useSiteBanner();
  const {
    bannerDismissable,
    bannerId,
    bannerSeverity,
    bannerText,
    dismissed
  } = data;
  const {
    t
  } = useI18n();

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
