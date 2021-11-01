import mongoose, {
  Schema
} from 'mongoose';

import {
  GalleryItem,
  GalleryItemSchema
} from './galleryitems.js';
import {
  runStandardCreateQuery,
  runStandardGetQuery
} from './utils.js';

/** @type {import('mongoose').SchemaOptions} */
const opts = {
  collection: `galleries`,
  strict: `throw`
}

/** @type {import('mongoose').Schema<import('~/t').PhotoGallery>} */
export const GallerySchema = new Schema({
  items: [ GalleryItemSchema ],
  name: {
    required: true,
    type: String
  }
}, opts);

/** @type {import('mongoose').Model<import('~/t').PhotoGallery>} */
const Gallery = mongoose.model(`Gallery`, GallerySchema);

/** @type {import('~/t').DBQueryFunction<import('~/t').PhotoGallery>} */
export const getGalleries = async function(dbQuery) {
  return runStandardGetQuery(Gallery, dbQuery);
};

/** @type {import('~/t').DBQueryFunction<import('~/t').PhotoGallery>} */
export const createGallery = async function(dbQuery) {
  return runStandardCreateQuery(Gallery, dbQuery);
};

/** @type {import('~/t').DBQueryFunction<import('~/t').PhotoGallery, import('~/t').GalleryItem>} */
export const createGalleryItem = async function(dbQuery) {
  const {
    data,
    which
  } = dbQuery;
  const {
    _id
  } = which;

  try {
    // TODO: figure out why this can't be correctly typed
    const gallery = await Gallery.findById(_id).exec();

    gallery.items.push(new GalleryItem(data));

    await gallery.save();

    return {
      data: gallery.items.slice(-1),
      metadata: {
        total: 1
      }
    };
  }
  catch (ex) {
    return {
      data: [],
      metadata: {
        error: ex.toString()
      }
    };
  }
}
