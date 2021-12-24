import express from 'express';

import {
  ensureSignedIn
} from './utils.js';

const router = express.Router({
  mergeParams: true
});

router.get(
  `/settings`,
  /** @type {import('~/t').RouteHandler} */
  async function getSettings(req, res, next) {
    try {
      const db = res.locals.db;
      const response = await db.getSettings({
        which: {
          name: `site`
        }
      });

      res.status(200).json(response);
    }
    catch (ex) {
      next(ex);
    }
  }
);

router.patch(
  `/settings`,
  ensureSignedIn,
  /** @type {import('~/t').SignedInRouteHandler} */
  async function updateSettingsObject(req, res, next) {
    try {
      const db = res.locals.db;

      await db.updateSettings({
        data: req.body,
        which: {
          name: `site`
        }
      });

      res.status(200).json(req.body);
    }
    catch (ex) {
      next(ex);
    }
  }
);

export default router;
