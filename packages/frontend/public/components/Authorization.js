import * as types from '../types.js';

import {
  useSession
} from '~/utils/useSession.js';

/**
 * @typedef {Object} AuthorizationProps
 * @property {boolean} [ensureSignedIn]
 * @property {string} [permission]
 */

/** @type {types.Component<AuthorizationProps>} */
function Authorization(props) {
  const {
    children,
    ensureSignedIn
  } = props;
  const {
    isSignedIn
  } = useSession();

  if (ensureSignedIn && !isSignedIn) {
    return null;
  }

  return (
    <>
      {children}
    </>
  );
}

export default Authorization;
