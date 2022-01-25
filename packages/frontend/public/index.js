import 'preact/debug';

import {
  render
} from 'preact';
import {
  ErrorBoundary,
  LocationProvider,
  Router,
  Route,
  lazy,
  prerender as ssr
} from 'preact-iso';

import Home from './pages/home/index.js';
import NotFound from './pages/_404.js';

import Busy from './components/Busy.js';
import Footer from './components/Footer.js';
import GlobalToast from './components/GlobalToast.js';
import Header from './components/Header.js';
import {
  ModalDialogProvider
} from './components/ModalDialog.js';
import PrivateRoute from './components/PrivateRoute.js';
import {
  fireEvent
} from './utils/analytics.js';
import {
  DocumentLevelProvider
} from './utils/useDocumentLevel.js';
import {
  GlobalToastProvider
} from './utils/useGlobalToast.js';
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
const Photos = lazy(() => import('./pages/photos/index.js'));
const PhotoGallery = lazy(() => import('./pages/photos/gallery.js'));
const Settings = lazy(() => import('./pages/settings/index.js'));

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

  return [ dictionary, locale, sessionCheck, siteSettings ].every(Boolean);
}

function AppContents() {
  const ready = useApp();

  return (
    <>
      <a id="skip-link" href="#main">
        skip to content
      </a>
      <Header />
      <Busy
        asTag="main"
        id="main"
        ready={ready}
      >
        <Router>
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/blog" component={Blog} />
          <Route path="/blog/posts/:id" component={BlogPost} />
          <Route path="/photos" component={Photos} />
          <Route path="/photos/gallery/:id" component={PhotoGallery} />
          <PrivateRoute path="/settings" component={Settings} />
          <Route default component={NotFound} />
        </Router>
      </Busy>
      <Footer />
    </>
  );
}

export function App() {
  return (
    <LocationProvider>
      <ErrorBoundary onError={onAppError}>
        <GlobalToastProvider>
          <DocumentLevelProvider value={1}>
            <ModalDialogProvider>
              <AppContents />
            </ModalDialogProvider>
            <GlobalToast />
          </DocumentLevelProvider>
        </GlobalToastProvider>
      </ErrorBoundary>
    </LocationProvider>
  );
}

render(<App />, document.querySelector(`#app`));

/** @param {any} data */
export async function prerender(data) {
  return await ssr(<App {...data} />);
}
