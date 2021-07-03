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
  const blogPost = useRemoteData({
    apiEndpoint: `blog/posts/${id}`
  });
  const {
    comments,
    createComment
  } = useBlogPostComments({
    id
  });

  return {
    ...blogPost,
    createComment,
    data: {
      ...(blogPost.data ?? {}),
      comments
    }
  };
}

export {
  useBlogPost
};
