import * as types from './types';

import 'preact/devtools';

import {
  useEffect
} from 'preact/hooks';
import hydrate from 'preact-iso/hydrate';
import lazy, {
  ErrorBoundary
} from 'preact-iso/lazy';
import {
  LocationProvider,
  Router
} from 'preact-iso/router';

import PrivateRoute from './PrivateRoute';
import Footer from './components/Footer';
import Header from './components/Header';
import NotFound from './pages/not-found';
import {
  initialState
} from './state/globalState';
import {
  doSetDictionary,
  doSetLocale,
  doSetSupportedLocales,
  selectLocale,
  selectSupportedLocales
} from './state/i18n';
import {
  doGetExistingSession,
  selectPreferredLocale
} from './state/session';
import {
  createGlobalState,
  useActionCreators,
  useSelectors
} from './utils/useGlobalState';

import './theme.css';
import './global.css';

const Blog = lazy(() => import('./pages/blog/index.js'));
const BlogPost = lazy(() => import('./pages/blog/index.js'));

/** @type {Object.<string,types.Component>} */
const publicRoutes = {
  '/blog': Blog,
  '/blog/posts/:id': BlogPost,
  '/home': Blog
};

const privateRoutes = {
  '/me': lazy(() => import('./pages/me/index.js'))
};

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

  useEffect(function requestAllData() {
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
          <ErrorBoundary>
            <LocationProvider>
              <Router onLoadEnd={onNavigate}>
                {Object.entries(publicRoutes).map(
                  ([ path, C ]) => <C path={path} key={path} />
                )}
                {Object.entries(privateRoutes).map(
                  ([ path, C ]) => <PrivateRoute component={C} path={path} key={path} />
                )}
                <NotFound default />
              </Router>
            </LocationProvider>
          </ErrorBoundary>
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
