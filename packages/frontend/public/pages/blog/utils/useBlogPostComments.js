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
    create,
    get
  } = useRemoteCollection({
    apiEndpoint: `blog/posts/${id}/comments`,
    initialData
  });
  const {
    data
  } = get;
  const {
    currentUser
  } = useSession();
  /** @type {(commentText: string) => Promise<void>} */
  const createComment = useCallback(async function createComment(commentText) {
    create.execute({
      name: currentUser,
      text: commentText
    });
  }, [ currentUser, create.execute ]);

  return {
    comments: data || initialData,
    createComment: {
      ...create,
      execute: createComment
    }
  };
}

export {
  useBlogPostComments
};
