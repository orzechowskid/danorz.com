import {
  useEffect
} from 'preact/hooks';
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

/** @type {Component<PrivateRouteProps>} */
function PrivateRoute(props) {
  const {
    component: Component
  } = props;
  const {
    isSignedIn,
    route
  } = usePrivateRoute();

  useEffect(function componentDidMount() {
    if (isSignedIn === false) {
      window.history.pushState(undefined, ``, `/home`);
      route(`/home`);
    }
  }, [ isSignedIn ]);

  if (!isSignedIn) {
    return null;
  }

  return (
    <Component />
  );
}

export default PrivateRoute;

