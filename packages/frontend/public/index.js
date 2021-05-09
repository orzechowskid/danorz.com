import 'preact/devtools';

import hydrate from 'preact-iso/hydrate';
import {
  ErrorBoundary
} from 'preact-iso/lazy';
import {
  LocationProvider,
  Router
} from 'preact-iso/router';

import * as types from './types.js';

import Footer from './components/Footer.js';
import Header from './components/Header.js';
import PrivateRoute from './components/PrivateRoute.js';
import About from './pages/about/index.js';
import Blog from './pages/blog/index.js';
import BlogPost from './pages/blog/post.js';
import Home from './pages/home/index.js';
import Me from './pages/me/index.js';
import NotFound from './pages/not-found/index.js';
import Settings from './pages/settings/index.js';
import {
  useDictionary,
  useLocale
} from './utils/useI18n.js';
import {
  useSiteSettings
} from './utils/useSiteSettings.js';

import busyStyles from './components/Busy.module.css';

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
  '/me': Me,
  '/settings': Settings
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

function usePreloadData() {
  const {
    locale
  } = useLocale();
  const dictionary = useDictionary(locale);
  const {
    data: siteSettings
  } = useSiteSettings({
    raw: true
  });

  return [ locale, dictionary, siteSettings ].every(Boolean);
}

function Contents() {
  return (
    <LocationProvider>
      <ErrorBoundary>
        <Router onLoadEnd={onNavigate}>
          {routes}
        </Router>
      </ErrorBoundary>
    </LocationProvider>
  );
}

function App() {
  const ready = usePreloadData();

  return (
    <>
      <div id="app">
        <a id="skip-link" href="#main">skip to content</a>

        <Header />

        <main
          aria-busy={!ready}
          className={busyStyles.busy}
          id="main"
        >
          {ready && <Contents />}
        </main>

        <Footer />
      </div>

      <dialog id="modal-dialog" />
    </>
  );
}

hydrate(<App />, document.body);

export default App;
