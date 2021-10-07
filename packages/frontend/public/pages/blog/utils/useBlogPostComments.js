import {
  useCallback
} from 'preact/hooks';

import {
  useRemoteCollection
} from '~/utils/useRemoteData.js';
import {
  useSession
} from '~/utils/useSession.js';

/** @param {import('~/t').UseBlogPostComments} opts */
function useBlogPostComments(opts) {
  const {
    id,
    initialData
  } = opts;
  /** @type {import('~/t').RemoteCollection<import('~/t').BlogPostComment>} */
  const {
    data,
    doCreate
  } = useRemoteCollection({
    apiEndpoint: `blog/posts/${id}/comments`,
    fetchOpts: {
      initialData
    }
  });
  const {
    currentUser
  } = useSession();
  /** @type {(commentText: string) => Promise<void>} */
  const createComment = useCallback(async function createComment(commentText) {
    doCreate.execute({
      name: currentUser,
      text: commentText,
      timestamp: new Date().toUTCString()
    });
  }, [ currentUser, doCreate.execute ]);

  return {
    comments: data || initialData,
    createComment
  };
}

export {
  useBlogPostComments
};
