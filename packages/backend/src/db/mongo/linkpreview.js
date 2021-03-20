import mongoose from 'mongoose';

import * as types from '../../types.js';

import {
  runStandardGetQuery
} from './utils.js';

const opts = {
  collection: `linkpreviews`,
  strict: `throw`
};

export const LinkPreviewSchema = new mongoose.Schema({
  metadata: {
    type: Object
  },
  url: {
    index: {
      unique: true
    },
    type: String
  }
}, opts);

let LinkPreview = null;

/** @type {types.DBQueryFunction<types.LinkPreview>} */
export async function createLinkPreview(dbQuery) {
  const newLinkPreview = new LinkPreview(dbQuery.data);
  const response = await newLinkPreview.save();

  console.log({response});

  return {};
}

/** @type {types.DBQueryFunction<types.LinkPreview>} */
export function deleteLinkPreview(findArgs = {}) {
  return LinkPreview.findOne(findArgs)
    .remove()
    .exec();
}

/** @type {types.DBQueryFunction<types.LinkPreview>} */
export async function getLinkPreview(dbQuery) {
  return runStandardGetQuery(LinkPreview, dbQuery);
}

export function init(dbConnection) {
  LinkPreview = dbConnection.model(`LinkPreview`, LinkPreviewSchema);

  return LinkPreview;
}
