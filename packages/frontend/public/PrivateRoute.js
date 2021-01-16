import {
  useEffect
} from 'preact/hooks';
import {
  useLoc
} from 'preact-iso/router';

import {
  useGlobalState
} from './state/globalState';
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
  } = useLoc();
  const [ state ] = useGlobalState({
    isSignedIn: selectSignedIn
  });

  useEffect(function componentDidMount() {
    if (!state.isSignedIn) {
      window.history.pushState(undefined, ``, `/blog`);
      route(`/blog`);
    }
  }, []);

  if (!state.isSignedIn) {
    return null;
  }

  return (
    <Component />
  );
}

export default PrivateRoute;

