import * as types from '../types.js';

import express from 'express';

const router = express();

router.use(`/`, async function getEnv(req, res, next) {
  let err = null;

  try {
    const response = {
      data: [{
        hello: 'yes'
      }],
      metadata: {
        count: 1
      }
    };

    res.json(response)
      .end();
  }
  catch (ex) {
    err = ex;
  }

  next(err);
});

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
