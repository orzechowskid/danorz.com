import mongoose from 'mongoose';

/** @type {import('mongoose').SchemaOptions} */
const opts = {
  strict: `throw`
};

export const CommentSchema = new mongoose.Schema({
  gravatarHash: String,
  name: {
    required: true,
    type: String
  },
  text: {
    required: true,
    type: String
  },
  timestamp: {
    default: Date.now,
    required: true,
    type: Date
  }
}, opts);

export const CommentModel = mongoose.model(`Comment`, CommentSchema);
