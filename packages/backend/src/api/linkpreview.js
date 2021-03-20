import express from 'express';
import { getLinkPreview } from 'link-preview-js';

import {
  ensureSignedIn
} from './utils.js';

const router = express();

router.get(
  `/`,
  async function getPreview(req, res, next) {
    /** @type {types.DBConnection} */
    const db = res.locals.db;
    let err = null;

    try {
      const slug = req.query.url.split(`://`)[1];
      const result = await db.getLinkPreview({
        which: {
          url: slug
        }
      });

      res.status(200)
        .json(result)
        .end();
    }
    catch (ex) {
      err = ex;
    }

    next(err);
  });

router.post(
  `/`,
  ensureSignedIn,
  async function createPreview(req, res, next) {
    /** @type {types.DBConnection} */
    const db = res.locals.db;
    let result = null;
    let err = null;

    try {
      const slug = req.query.url.split(`://`)[1];

      result = await db.getLinkPreview({
        which: {
          url: slug
        }
      });

      if (result.metadata.total) {
        /* already exists */
        res.status(200).json(result).end();
      }
      else {
        const linkPreviewData = await getLinkPreview(req.query.url);

        result = await db.createLinkPreview({
          data: {
            metadata: linkPreviewData,
            url: slug
          }
        });

        res.status(201).json(result).end();
      }
    }
    catch(ex) {
      err = ex;
    }

    next(err);
  });

export default router;
