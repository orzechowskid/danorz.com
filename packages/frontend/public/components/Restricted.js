import {
  useSession
} from '~/utils/useSession.js';
import {
  useSiteSettings
} from '~/utils/useSiteSettings.js';

function useRestricted(opts) {
  const {
    ifSignedIn,
    ifSiteSettingEnabled
  } = opts;
  const {
    isSignedIn
  } = useSession();
  const {
    getSetting
  } = useSiteSettings();

  if (ifSignedIn && isSignedIn) {
    return true;
  }
  else if (getSetting(ifSiteSettingEnabled) === true) {
    return true;
  }

  return false;
}

/** @type {Component<RestrictedProps>} */
function Restricted(props) {
  const {
    children,
    ifSignedIn,
    ifSiteSettingEnabled
  } = props;
  const ok = useRestricted({
    ifSignedIn,
    ifSiteSettingEnabled
  });

  return ok
    ? children
    : undefined;
}

export default Restricted;
