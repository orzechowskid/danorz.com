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
import NotFound from './components/NotFound';
import SiteBanner from './components/SiteBanner';
import {
  createGlobalState
} from './state/globalState';
import {
  initialState
} from './state/selectors';

import './theme.css';
import './global.css';

const publicRoutes = {
  '/blog': lazy(() => import('./pages/blog/index.js'))
};

const privateRoutes = {
  '/me': lazy(() => import('./pages/me/index.js'))
};

export function App(serverData) {
  return (
    <LocationProvider>
      <ErrorBoundary>
        <a id="skip-link" href="#main">skip to content</a>

        <SiteBanner />

        <Header />

        <main id="main">
          <Router>
            {Object.entries(publicRoutes).map(
              ([ path, Component ]) => <Component path={path} key={path} />
            )}
            {Object.entries(privateRoutes).map(
              ([ path, Component ]) => <PrivateRoute component={Component} path={path} key={path} />
            )}
            <NotFound default />
          </Router>
        </main>

        <Footer />

        <aside>
          <dialog aria-modal="true" id="modal-dialog" tabIndex="-1"></dialog>
        </aside>
      </ErrorBoundary>
    </LocationProvider>
  );
}

createGlobalState(initialState);
hydrate(<App />, document.body);

export async function prerender(data) {
  createGlobalState(data);

  return (await import('preact-iso/prerender')).default(<App />);
}
