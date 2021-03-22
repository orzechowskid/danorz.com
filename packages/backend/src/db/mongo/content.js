import * as types from '../../types.js';

import mongoose from 'mongoose';

import {
  runStandardGetQuery
} from './utils.js';

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

let Content = null;

/** @type {types.DBQueryFunction<types.Content>} */
export async function getContent(dbQuery) {
  return runStandardGetQuery(Content, dbQuery);
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

  console.log({data, which});
  try {
    const response = await Content.findOneAndUpdate(which, { $set: data }, { lean: true, new: true }).exec();

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

export function init(dbConnection) {
  Content = dbConnection.model(`Text`, ContentSchema);
}
