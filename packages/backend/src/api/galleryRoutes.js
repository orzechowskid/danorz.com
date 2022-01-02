import multer from 'multer';
import express from 'express';
import mime from 'mime';
import sharp from 'sharp';

import {
  ensureSignedIn,
  normalizeFilename
} from './utils.js';

const router = express.Router({
  mergeParams: true
});
const fileUploadHandler = multer();

router.get(
  `/galleries`,
  /** @type {import('~/t').RouteHandler} */
  async function getGalleries(req, res, next) {
    try {
      const {
        db
      } = res.locals;
      const response = await db.getGalleries({});

      res.status(200).json(response);
    }
    catch (ex) {
      next(ex);
    }
  }
);

router.get(
  `/galleries/:id`,
  async function getGalleries(req, res, next) {
    try {
      const {
        db
      } = res.locals;
      const response = await db.getGalleries({
        which: {
          _id: req.params.id
        }
      });

      res.status(200).json(response);
    }
    catch (ex) {
      next(ex);
    }
  }
);

router.post(
  `/galleries`,
  ensureSignedIn,
  async function createGallery(req, res, next) {
    try {
      const {
        db
      } = res.locals;
      const response = await db.createGallery({
        data: req.body
      });

      res.status(201).json(response);
    }
    catch (ex) {
      next(ex);
    }
  }
);

router.post(
  `/galleries/:id`,
  ensureSignedIn,
  fileUploadHandler.array('file', 12), // TODO: remove magic number
  async function createGalleryItem(req, res, next) {
    try {
      const {
        db,
        storage
      } = res.locals;
      const {
        id
      } = req.params;
      const results = await Promise.all(req.files.map(async function(file) {
        const imageBuffer = file.buffer;
        const thumbnailBuffer = Buffer.from(imageBuffer);
        const thumbnail = await sharp(thumbnailBuffer)
          .resize(160, 120, {
            fit: `cover`
          })
          .toBuffer();
        const fileName = normalizeFilename(file.originalname);
        const mimeType = mime.getType(fileName);
        const {
          path: thumbnailPath
        } = await storage.uploadObject({
          data: thumbnail,
          fileName,
          folderName: `galleries/${id}/thumbnails`,
          mimeType
        });
        const {
          path
        } = await storage.uploadObject({
          data: imageBuffer,
          fileName,
          folderName: `galleries/${id}`,
          mimeType
        });

        return db.createGalleryItem({
          data: {
            mimeType,
            path: `/media/${path}`,
            thumbnailPath: `/media/${thumbnailPath}`,
            timestamp: new Date().toUTCString()
          },
          which: {
            _id: id
          }
        });
      }));

      res.status(201).json({
        data: results,
        metadata: {
          total: results.length
        }
      })
    }
    catch (ex) {
      next(ex);
    }
  }
);

export default router;
