import express from 'express';
import {
  getLinkPreview
} from 'link-preview-js';

import {
  ensureSignedIn
} from './utils.js';

const router = express.Router({
  mergeParams: true
});

router.get(
  `/`,
  /** @type {import('~/t').RouteHandler} */
  async function getPreview(req, res, next) {
    try {
      const db = res.locals.db;
      const response = await db.getLinkPreview({
        which: {
          url: req.query.url.split(`://`)[1]
        }
      });

      res.status(200).json(response);
    }
    catch (ex) {
      next(ex);
    }
  });

router.post(
  `/`,
  ensureSignedIn,
  /** @type {import('~/t').SignedInRouteHandler} */
  async function createPreview(req, res, next) {
    try {
      const db = res.locals.db;
      const slug = req.query.url.split(`://`)[1];
      let response = await db.getLinkPreview({
        which: {
          url: slug
        }
      });

      if (response.metadata.total === 0) {
        /* already exists */
        res.status(200).end();
      }
      else {
        const linkPreviewData = await getLinkPreview(req.query.url);

        response = await db.createLinkPreview({
          data: {
            metadata: linkPreviewData,
            url: slug
          }
        });

        res.status(201).json(response);
      }
    }
    catch (ex) {
      next(ex);
    }
  });

export default router;
