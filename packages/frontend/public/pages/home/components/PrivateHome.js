import {
  useRemoteCollection
} from '~/utils/useRemoteData.js';

/** @type {import('~/t').Component<{}>} */
const PrivateHome = function() {
  const {
    data: posts
  } = useRemoteCollection(`social/feed`);
  const {
    data: connectRequests
  } = useRemoteCollection(`social/connect-requests`);

  return (
    <div>
      <span>private home</span>
      <div><a href="/settings">settings</a></div>
      <div>
        <div>Requests</div>
        <div>
          {connectRequests?.map((x, idx) => <span key={idx}>{JSON.stringify(x)}</span>)}
        </div>
      </div>
      <div>
        <div>Posts</div>
        <div>
          {posts?.map((x, idx) => <span key={idx}>{JSON.stringify(x)}</span>)}
        </div>
      </div>
    </div>
  );
}

export default PrivateHome;
