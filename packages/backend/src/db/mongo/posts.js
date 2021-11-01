import mongoose from 'mongoose';

import {
  CommentModel,
  CommentSchema
} from './comments.js';

/** @type {import('mongoose').SchemaOptions} */
const opts = {
  collection: `posts`,
  strict: `throw`
};

export const PostSchema = new mongoose.Schema({
  author: {
    required: true,
    type: String
  },
  comments: [ CommentSchema ],
  peerResourceId: {
    required: true,
    type: String
  },
  tags: [ String ],
  text: {
    required: true,
    type: String
  },
  timestamp: {
    required: true,
    type: Date
  },
  title: {
    required: true,
    type: String
  }
}, opts);

export const Post = mongoose.model(`Post`, PostSchema);

/** @type {import('~/t').DBQueryFunction<import('~/t').BlogPostComment>} */
export async function addComment(dbQuery) {
  const {
    data: newComment,
    which
  } = dbQuery;
  const {
    id
  } = which;

  try {
    const post = await Post.findById(id).exec();

    post.comments = [
      ...post.comments,
      new CommentModel(newComment)
    ];

    await post.save();

    return {
      data: post.comments.slice(-1),
      metadata: {
        total: 1
      }
    };
  } catch (ex) {
    return {
      data: [],
      metadata: {
        error: ex.toString()
      }
    };
  }
}

/** @type {types.DBQueryFunction<types.BlogPost>} */
export async function addPost(dbQuery) {
  const {
    data: newPost
  } = dbQuery;

  try {
    const post = new Post(newPost);

    await post.save();

    return {
      data: [ newPost ],
      metadata: {
        total: 1
      }
    };
  } catch (ex) {
    return {
      data: [],
      metadata: {
        error: ex.toString()
      }
    };
  }
}

/** @type {types.DBQueryFunction<types.BlogPost>} */
export async function getPosts(dbQuery) {
  const {
    count = 1,
    start = 0,
    which
  } = dbQuery;
  const findArgs = which && which._id
    ? {
      _id: which._id
    }
    : {};
  const dataQuery = Post.find(findArgs)
    .sort(`field -_id`)
    .skip(+start)
    .limit(+count)
    .lean()
    .exec();
  const totalQuery = Post.countDocuments(findArgs)
    .exec();

  const [ total, data ] = await Promise.all([
    totalQuery,
    dataQuery
  ]);

  return {
    data,
    metadata: {
      total
    }
  };
}

/** @type {types.DBQueryFunction<types.BlogPostComment[]>} */
export async function getBlogPostComments(dbQuery) {
  const {
    count = 1,
    start = 0,
    which
  } = dbQuery;
  const findArgs = which?.id
    ? {
      _id: which.id
    }
    : {};
  const dataQuery = Post.find(findArgs)
    .sort(`field -_id`)
    .skip(+start)
    .limit(+count)
    .lean()
    .exec();

  const data = (await dataQuery)?.[0]?.comments ?? [];
  const total = data.length;

  return {
    data,
    metadata: {
      total
    }
  };
}
