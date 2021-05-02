import * as types from '~/types.js';

import {
  useSession
} from '~/utils/useSession.js';

/**
 * @typedef {Object} RestrictedProps
 * @property {Object} children
 * @property {boolean} [ensureSignedIn]
 * @property {string} [permission]
 */

/** @type {types.Component<RestrictedProps>} */
function Restricted(props) {
  const {
    children,
    ensureSignedIn,
    permission
  } = props;
  const {
    isSignedIn
  } = useSession();

  if (ensureSignedIn && !isSignedIn) {
    return <span/>;
  }

  return (
    <>
      {children}
    </>
  );
}

export default Restricted;
