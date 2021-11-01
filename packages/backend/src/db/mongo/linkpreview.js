import mongoose from 'mongoose';

import {
  runStandardGetQuery
} from './utils.js';

/** @type {import('mongoose').SchemaOptions} */
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

const LinkPreview = mongoose.model(`LinkPreview`, LinkPreviewSchema);

/** @type {types.DBQueryFunction<types.LinkPreview>} */
export async function createLinkPreview(dbQuery) {
  const newLinkPreview = new LinkPreview(dbQuery.data);
  const response = await newLinkPreview.save();

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
