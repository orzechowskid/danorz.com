import {
  useRemoteCollection
} from '~/utils/useRemoteData.js';

/** @type {import('~/t').Component<{}>} */
const PrivateHome = function() {
  const {
    data
  } = useRemoteCollection(`social/feed`);

  return (
    <div>
      <span>private home</span>
      <div><a href="/settings">settings</a></div>
    </div>
  );
}

export default PrivateHome;
