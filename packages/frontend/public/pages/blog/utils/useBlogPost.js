import {
  useCallback
} from 'preact/hooks';

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
    get,
    update
  } = useRemoteData({
    apiEndpoint: `blog/posts/${id}`
  });
  const {
    data
  } = get
  const {
    comments,
    createComment
  } = useBlogPostComments({
    id
  });
  const editPost = useCallback(async function editPost(newText) {
    update.execute({
      ...data,
      text: newText
    });
  }, [ data, update.execute ]);

  return {
    createComment,
    data: {
      ...(data?.data ?? {}),
      comments: comments.data ?? []
    },
    editPost: {
      ...update,
      execute: editPost
    }
  };
}

export {
  useBlogPost
};
