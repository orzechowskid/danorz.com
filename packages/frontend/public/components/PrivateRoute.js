import {
  useEffect
} from 'preact/hooks';
import {
  useLocation
} from 'preact-iso/router';

import * as types from '~/types.js';

import {
  useSelectors
} from '~/utils/useGlobalState.js';
import {
  selectSignedIn
} from '~/state/session.js';

/**
 * @typedef {Object} PrivateRouteProps
 * @property {types.Component<any>} component
 */

/** @type {types.Component<PrivateRouteProps>} */
function PrivateRoute(props) {
  const {
    component: Component
  } = props;
  const {
    path,
    query,
    route,
    url
  } = useLocation();
  const {
    isSignedIn
  } = useSelectors({
    isSignedIn: selectSignedIn
  });

  console.log(`PrivateRoute:`, {isSignedIn});
  useEffect(function componentDidMount() {
    if (!isSignedIn) {
      console.log(`not signed in`);
      window.history.pushState(undefined, ``, `/home`);
      route(`/home`);
    }
  }, []);

  if (!isSignedIn) {
    return null;
  }

  return (
    <Component />
  );
}

export default PrivateRoute;

