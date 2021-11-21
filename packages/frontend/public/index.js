import 'preact/debug';

import {
  OverlayProvider
} from '@react-aria/overlays';
import {
  ErrorBoundary,
  LocationProvider,
  Router,
  Route,
  lazy,
  hydrate,
  prerender as ssr
} from 'preact-iso';

import Home from './pages/home/index.js';
import NotFound from './pages/_404.js';

import Busy from './components/Busy.js';
import Footer from './components/Footer.js';
import GlobalErrorToast from './components/GlobalErrorToast.js';
import Header from './components/Header.js';
import {
  fireEvent
} from './utils/analytics.js';
import {
  DocumentLevelProvider
} from './utils/useDocumentLevel.js';
import {
  GlobalErrorToastProvider
} from './utils/useGlobalErrorToast.js';
import {
  useDictionary,
  useLocale
} from './utils/useI18n.js';
import {
  useSession
} from './utils/useSession.js';
import {
  useSiteSettings
} from './utils/useSiteSettings.js';

const About = lazy(() => import('./pages/about/index.js'));
const Blog = lazy(() => import('./pages/blog/index.js'));
const BlogPost = lazy(() => import('./pages/blog/post.js'));

/**
 * @param {Error} err
 */
function onAppError(err) {
  fireEvent({
    eventData: JSON.stringify({
      message: err.message,
      url: window.location.href
    }),
    eventType: `appError`
  });
}

function useApp() {
  const {
    locale
  } = useLocale();
  const dictionary = useDictionary(locale);
  const {
    data: siteSettings
  } = useSiteSettings();
  const {
    isSignedIn
  } = useSession();
  const sessionCheck = isSignedIn !== undefined;

  return [ locale, dictionary, siteSettings, sessionCheck ].every(Boolean);
}

function AppContents() {
  const ready = useApp();

  return (
    <div id="app">
      <a id="skip-link" href="#main">skip to content</a>
      <Header />
      <Busy
        as="main"
        ready={ready}
      >
        <Router>
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/blog" component={Blog} />
          <Route path="/blog/posts/:id" component={BlogPost} />
          <Route default component={NotFound} />
        </Router>
      </Busy>
      <Footer />
    </div>
  );
}

export function App() {
  return (
    <ErrorBoundary onError={onAppError}>
      <GlobalErrorToastProvider>
        <LocationProvider>
          <DocumentLevelProvider value={1}>
            <OverlayProvider>
              <AppContents />
            </OverlayProvider>
            <GlobalErrorToast />
          </DocumentLevelProvider>
        </LocationProvider>
      </GlobalErrorToastProvider>
    </ErrorBoundary>
  );
}

hydrate(<App />);

/** @param {any} data */
export async function prerender(data) {
  return await ssr(<App {...data} />);
}
