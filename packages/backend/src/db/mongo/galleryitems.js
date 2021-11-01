import {
  model,
  Schema
} from 'mongoose';

/** @type {import('mongoose').SchemaOptions} */
const opts = {
  collection: `galleryItems`,
  strict: `throw`
};

/** @type {import('mongoose').Schema<import('~/t').GalleryItem>} */
export const GalleryItemSchema = new Schema({
  description: {
    type: String
  },
  mimeType: {
    required: true,
    type: String
  },
  path: {
    required: true,
    type: String
  },
  thumbnailPath: {
    required: true,
    type: String
  },
  timestamp: {
    type: Date
  }
}, opts);

/** @type {import('mongoose').Model<import('~/t').GalleryItem>} */
export const GalleryItem = model(`GalleryItem`, GalleryItemSchema);
