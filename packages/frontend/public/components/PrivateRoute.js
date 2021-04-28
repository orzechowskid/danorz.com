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
    route
  } = useLocation();
  const {
    isSignedIn
  } = useSelectors({
    isSignedIn: selectSignedIn
  });

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

