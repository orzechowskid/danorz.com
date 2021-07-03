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
    remoteCreate
  } = useRemoteCollection({
    apiEndpoint: `blog/posts/${id}/comments`,
    initialData
  });
  const {
    currentUser
  } = useSession();
  /** @type {(commentText: string) => Promise<void>} */
  const createComment = useCallback(async function createComment(commentText) {
    const newComment = {
      name: currentUser,
      text: commentText
    };

    await remoteCreate(newComment);
  }, [ currentUser, remoteCreate ]);

  return {
    comments: data || initialData,
    createComment
  };
}

export {
  useBlogPostComments
};
