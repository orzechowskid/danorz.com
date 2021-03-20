import 'preact/devtools';

import {
  useEffect
} from 'preact/hooks';
import hydrate from 'preact-iso/hydrate';
import {
  ErrorBoundary
} from 'preact-iso/lazy';
import {
  LocationProvider,
  Router
} from 'preact-iso/router';

import * as types from './types.js';

import PrivateRoute from './components/PrivateRoute.js';
import Footer from './components/Footer.js';
import Header from './components/Header.js';
import About from './pages/about/index.js';
import Blog from './pages/blog/index.js';
import BlogPost from './pages/blog/post.js';
import Home from './pages/home/index.js';
import Me from './pages/me/index.js';
import NotFound from './pages/not-found/index.js';
import {
  initialState
} from './state/globalState.js';
import {
  doSetDictionary,
  doSetLocale,
  doSetSupportedLocales,
  selectLocale,
  selectSupportedLocales
} from './state/i18n.js';
import {
  doGetExistingSession,
  selectPreferredLocale
} from './state/session.js';
import {
  createGlobalState,
  useActionCreators,
  useSelectors
} from './utils/useGlobalState.js';

import './theme.css';
import './global.css';

const publicRoutes = {
  '*': NotFound,
  '/': Home,
  '/about': About,
  '/blog': Blog,
  '/blog/posts/:postId': BlogPost
};

const privateRoutes = {
  '/me': Me
};

const routes = [
  ...Object.entries(publicRoutes).map(
    ([ path, C ]) => <C key={path} path={path} />
  ),
  ...Object.entries(privateRoutes).map(
    ([ path, C ]) => <PrivateRoute key={path} component={C} path={path} />
  ),
  <NotFound key="404" default />
];

function onNavigate() {
  /* Router.onLoadEnd() gets called before the router re-renders upon route change */
  setTimeout(function onNav() {
    if (window.location.hash) {
      document.getElementById(window.location.hash)?.scrollIntoView();
    }
  }, 0);
}

function useAppSetup() {
  const {
    locale,
    preferredLocale,
    supportedLocales
  } = useSelectors({
    locale: selectLocale,
    preferredLocale: selectPreferredLocale,
    supportedLocales: selectSupportedLocales
  });
  const actions = useActionCreators({
    doGetExistingSession,
    doSetDictionary,
    doSetLocale,
    doSetSupportedLocales
  });

  useEffect(function requestInitialAppData() {
    actions.doSetSupportedLocales();
    actions.doGetExistingSession();
  }, []);

  useEffect(function setLocaleFromUserPreferences() {
    if (!preferredLocale || Object.entries(supportedLocales).length === 0) {
      return;
    }

    actions.doSetLocale(preferredLocale);
  }, [ supportedLocales, preferredLocale ]);

  useEffect(function loadDictionaryForCurrentLocale() {
    if (!locale || Object.entries(supportedLocales).length === 0) {
      return;
    }

    actions.doSetDictionary(locale);
  }, [ supportedLocales, locale ]);
}

function App() {
  useAppSetup();

  return (
    <>
      <div id="app">
        <a id="skip-link" href="#main">skip to content</a>

        <Header />

        <main id="main">
          <LocationProvider>
            <ErrorBoundary>
              <Router onLoadEnd={onNavigate}>
                {routes}
              </Router>
            </ErrorBoundary>
          </LocationProvider>
        </main>

        <Footer />
      </div>

      <dialog id="modal-dialog" />
    </>
  );
}

createGlobalState(initialState);
hydrate(<App />, document.body);

export default App;
