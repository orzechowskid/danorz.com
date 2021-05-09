import * as types from '../types.js';

import express from 'express';

const router = express();

router.get(
  `/settings`,
  async function getSettings(req, res, next) {
    const db = res.locals.db;
    let err;

    try {
      const response = await db.getSettings({
        which: {
          name: `site`
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
