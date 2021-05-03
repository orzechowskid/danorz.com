import {
  useSession
} from '~/utils/useSession.js';

/** @type {Component<RestrictedProps>} */
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
