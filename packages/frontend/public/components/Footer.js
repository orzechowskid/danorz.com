import {
  useLocation
} from 'preact-iso';

import Heading from '~/components/Heading.js';
import Section from '~/components/Section.js';
import {
  useI18n
} from '~/utils/useI18n.js';

import styles from './Footer.module.css';
import layoutStyles from './Layout.module.css';

/** @type {import('~/t').Component<{}>} */
function Footer() {
  const {
    t
  } = useI18n();
  const {
    url
  } = useLocation();

  return (
    <footer class={styles.footer}>
      <Section
        as="nav"
        class={layoutStyles.layout}
      >
        <Heading at-only>
          {t(`Footer:nav-title`)}
        </Heading>
        <ul>
          <li>
            <a
              aria-current={url === `/` || undefined}
              href="/"
            >
              {t(`Home:title`)}
            </a>
          </li>
          <li>
            <a
              aria-current={url.startsWith(`/blog`) || undefined}
              href="/blog"
            >
              {t(`Blog:title`)}
            </a>
          </li>
          <li>
            <a
              aria-current={url.startsWith(`/photos`) || undefined}
              href="/photos">
              {t(`Photos:title`)}
            </a>
          </li>
          <li>
            <a
              aria-current={url === `/about` || undefined}
              href="/about"
            >
              {t(`About:title`)}
            </a>
          </li>
        </ul>
      </Section>
    </footer>
  );
}

export default Footer;
