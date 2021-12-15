import {
  useCallback
} from 'preact/hooks';
import {
  useRemoteCollection,
  useRemoteObject
} from '~/utils/useRemoteData.js';
import {
  useSession
} from '~/utils/useSession.js';

/**
 * @typedef UseBlogPostOpts
 * @property {string} [postId]
 */

/**
 * @typedef BlogPostResource
 * @property {boolean} busy
 * @property {(commentText: string) => Promise<void>} createComment
 * @property {Partial<import('dto').BlogPost>} data
 * @property {(id: import('dto').Id) => Promise<void>} deleteComment
 * @property {Error} [error]
 * @property {(comment: import('dto').BlogPostComment) => Promise<void>} updateComment
 * @property {(post: import('dto').BlogPost) => Promise<void>} updatePost
 * @description a logical resource built up from data at multiple API endpoints
 */

/** @type {(opts: UseBlogPostOpts) => BlogPostResource} */
const useBlogPost = (opts) => {
  const {
    postId
  } = opts;
  /** @type {import('~/t').RemoteObject<import('dto').BlogPost>} */
  const {
    busy: postBusy,
    data: postData,
    doUpdate: doUpdatePost,
    error: postError
  } = useRemoteObject(`blog/posts/${postId}`);
  const {
    currentUser
  } = useSession();
  /** @type {import('~/t').RemoteCollection<import('dto').BlogPostComment>} */
  const {
    busy: commentsBusy,
    data: commentData,
    doCreate: doCreateComment,
    doDelete: doDeleteComment,
    doUpdate: doUpdateComment,
    error: commentsError
  } = useRemoteCollection(`blog/posts/${postId}/comments`);
  const data = {
    ...postData,
    comments: commentData
  };
  const updatePost = useCallback(
    /** @param {import('dto').BlogPost} blogPost */
    function updatePost(blogPost) {
      return doUpdatePost.execute(blogPost);
    },
    []
  );
  const updateComment = useCallback(
    /** @param {import('dto').BlogPostComment} blogPostComment */
    async function updateComment(blogPostComment) {
      return doUpdateComment.execute(blogPostComment);
    },
    [ doUpdateComment ]
  );
  const createComment = useCallback(
    /** @param {string} newCommentText */
    function createComment(newCommentText) {
      /** @type {Partial<import('dto').BlogPostComment>} */
      const newComment = {
        name: currentUser,
        text: newCommentText,
        timestamp: new Date().toISOString()
      };

      return doCreateComment.execute(newComment);
    },
    [ doCreateComment ]
  );
  const deleteComment = useCallback(
    /** @param {import('dto').Id} commentId */
    async function deleteComment(commentId) {
      return doDeleteComment.execute(commentId);
    },
    [ doDeleteComment ]
  );

  return {
    busy: postBusy || commentsBusy,
    createComment,
    data,
    deleteComment,
    error: postError || commentsError || undefined,
    updateComment,
    updatePost
  };
};

export {
  useBlogPost
};
