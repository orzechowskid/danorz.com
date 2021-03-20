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

export function init(dbConnection) {
  Content = dbConnection.model(`Text`, ContentSchema);
}
