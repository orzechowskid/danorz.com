import layoutStyles from '~/components/Layout.module.css';
import {
  useI18n
} from '~/utils/useI18n.js';
import {
  usePageMeta,
  usePageTitle
} from '~/utils/usePageTitle.js';
import {
  useSession
} from '~/utils/useSession.js';

import PublicHome from './components/PublicHome.js';

function useHomePage() {
  const {
    t
  } = useI18n();
  const {
    isSignedIn
  } = useSession();
  const page = `Home`;
  const pageTitle = t(`${page}:title`);
  usePageTitle(pageTitle);
  usePageMeta(function setPageMetaTags() {
    return {
      description: t(`${page}:description`)
    }
  }, [ t ]);

  return {
    isSignedIn
  };
}

function Home() {
  const {
    isSignedIn
  } = useHomePage();

  return (
    <section className={layoutStyles.layout}>
      {isSignedIn
        ? <span>private</span>
        : <PublicHome />}
    </section>
  );
}

export default Home;
