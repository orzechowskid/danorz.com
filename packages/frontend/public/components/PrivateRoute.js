import {
  useEffect
} from 'preact/hooks';
import {
  Route
} from 'preact-iso';
import {
  useLocation
} from 'preact-iso/router';

import {
  useSession
} from '~/utils/useSession.js';

function usePrivateRoute() {
  const {
    route
  } = useLocation();
  const {
    isSignedIn
  } = useSession();

  return {
    isSignedIn,
    route
  };
}

/** @type {import('~/t').Component<import('preact-iso').RouteProps<any>>} */
const PrivateRoute = function(props) {
  const {
    component: Component,
    path
  } = props;
  const {
    isSignedIn,
    route
  } = usePrivateRoute();

  useEffect(function componentDidMount() {
    if (isSignedIn === false) {
      window.history.pushState(undefined, ``, `/`);
      route(`/`);
    }
  }, [ isSignedIn ]);

  if (!isSignedIn) {
    return null;
  }

  return (
    <Route path={path} component={Component} />
  );
}

export default PrivateRoute;

