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
          <li><a href="/">Home</a></li>
          <li><a href="/blog">Blog</a></li>
          <li><a href="/about">About</a></li>
        </ul>
      </Section>
    </footer>
  );
}

export default Footer;
