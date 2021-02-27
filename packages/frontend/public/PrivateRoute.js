import {
  useEffect
} from 'preact/hooks';
import {
  useLocation
} from 'preact-iso/router';

import {
  useSelectors
} from './utils/useGlobalState';
import {
  selectSignedIn
} from './state/session';

import * as types from './types';

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

  useEffect(function componentDidMount() {
    if (!isSignedIn) {
      window.history.pushState(undefined, ``, `/`);
      route(`/`);
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

