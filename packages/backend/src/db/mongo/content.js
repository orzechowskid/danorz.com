import mongoose from 'mongoose';

import {
  runStandardGetQuery
} from './utils.js';

/** @type {import('mongoose').SchemaOptions} */
const opts = {
  collection: `text`,
  strict: `throw`
};

export const ContentSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String
  },
  text: {
    required: true,
    type: String
  }
}, opts);

const Content = mongoose.model(`Text`, ContentSchema);

/** @type {types.DBQueryFunction<types.Content>} */
export async function getContent(dbQuery) {
  return runStandardGetQuery(Content, dbQuery);
}

/** @type {types.DBQueryFunction<types.Content>} */
export async function createContent(dbQuery) {
  const {
    data
  } = dbQuery;
  let total = -1;
  let error;

  try {
    const newContent = new Content(data);

    await newContent.save();

    return {
      data: [ newContent ],
      metadata: {
        total: 1
      }
    };
  }
  catch (ex) {
    error = ex.message;

    return {
      data: [],
      metadata: {
        error,
        total
      }
    };
  }
}

/** @type {types.DBQueryFunction<types.Content>} */
export async function updateContent(dbQuery) {
  const {
    data,
    which
  } = dbQuery;
  let result;
  let total = -1;
  let error;

  try {
    const response = await Content.findOneAndUpdate(which, {
      $set: data
    }, {
      lean: true, new: true
    }).exec();

    result = [].concat(response);
    total = 1;
  }
  catch (ex) {
    error = ex.message;
  }

  return {
    data: result,
    metadata: {
      error,
      total
    }
  };
}
