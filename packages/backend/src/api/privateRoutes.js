import express from 'express';

import {
  ensureSignedIn
} from './utils.js';

const router = express();

/* require auth on all private routes */
router.use(ensureSignedIn);

router.get(
  `/settings/:settingsObject`,
  async function getSettings(req, res, next) {
    const db = res.locals.db;
    let err;

    try {
      const response = await db.getSettings({
        which: {
          name: req.params.settingsObject
        }
      });

      res.json(response)
        .end();
    }
    catch (ex) {
      err = ex;
    }

    next(err);
  }
);

export default router;
