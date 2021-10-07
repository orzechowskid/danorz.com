import {
  useRemoteData
} from '~/utils/useRemoteData.js';

import {
  useBlogPostComments
} from './useBlogPostComments.js';

/**
 * @param {import('~/t').UseBlogPost} opts
 */
function useBlogPost(opts) {
  const {
    id
  } = opts;
  /** @type {import('~/t').RemoteResource<import('~/t').BlogPost>} */
  const {
    data,
    doUpdate
  } = useRemoteData({
    apiEndpoint: `blog/posts/${id}`
  });
  const {
    comments,
    createComment
  } = useBlogPostComments({
    id
  });

  return {
    createComment,
    data: {
      ...data,
      comments
    },
    editPost: doUpdate
  };
}

export {
  useBlogPost
};
