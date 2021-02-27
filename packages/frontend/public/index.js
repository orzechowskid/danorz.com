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
import SiteBanner from './components/SiteBanner';
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
  createGlobalState, useActionCreators, useSelectors
} from './utils/useGlobalState';

import './theme.css';
import './global.css';

/** @type {Object.<string,types.Component>} */
const publicRoutes = {
  '/blog': lazy(() => import('./pages/blog/index.js')),
  '/blog/posts/:id': lazy(() => import('./pages/blog/post.js'))
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

function useLocaleSetup() {
  const {
    locale,
    supportedLocales
  } = useSelectors({
    locale: selectLocale,
    supportedLocales: selectSupportedLocales
  });
  const actions = useActionCreators({
    doSetDictionary,
    doSetLocale,
    doSetSupportedLocales
  });

  useEffect(function getSupportedLocales() {
    actions.doSetSupportedLocales();
  }, []);

  useEffect(function setInitialLocale() {
    if (Object.entries(supportedLocales).length === 0) {
      return;
    }

    const initialLocale = navigator?.language;

    actions.doSetLocale(
      supportedLocales[initialLocale]
        ? initialLocale
        : `en-US`
    );
  }, [ supportedLocales ]);

  useEffect(function fetchDictionary() {
    if (!locale) {
      return;
    }

    actions.doSetDictionary(locale);
  }, [ locale ]);

}

function App() {
  useLocaleSetup();

  return (
    <>
      <div id="app">
        <a id="skip-link" href="#main">skip to content</a>

        <SiteBanner />

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
