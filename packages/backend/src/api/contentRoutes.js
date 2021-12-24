import express from 'express';

import {
  ensureSignedIn
} from './utils.js';

const router = express.Router({
  mergeParams: true
});

router.get(
  `/:documentName`,
  /** @type {import('~/t').RouteHandler} */
  async function getContent(req, res, next) {
    try {
      const db = res.locals.db;
      const response = await db.getContent({
        which: {
          name: req.params.documentName
        }
      });

      res.status(200).json(response);
    }
    catch (ex) {
      next(ex);
    }
  });

router.post(
  `/:documentName`,
  ensureSignedIn,
  /** @type {import('~/t').SignedInRouteHandler} */
  async function createContent(req, res, next) {
    try {
      const db = res.locals.db;
      const response = await db.createContent({
        data: req.body
      });

      res.status(201).json(response);
    }
    catch (ex) {
      next(ex);
    }
  });

router.put(
  `/:documentName`,
  ensureSignedIn,
  /** @type {import('~/t').SignedInRouteHandler} */
  async function updateContent(req, res, next) {
    try {
      const db = res.locals.db;
      const response = await db.updateContent({
        data: req.body,
        which: {
          name: req.params.documentName
        }
      });

      res.status(200).json(response);
    }
    catch (ex) {
      next(ex);
    }
  });

export default router;
