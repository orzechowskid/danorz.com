import mongoose from 'mongoose';

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
  }
}, opts);

export const CommentModel = mongoose.model(`Comment`, CommentSchema);
