import * as types from '../types';

import express from 'express';

const router = express();

router.use(`*`, async function doAnalytics(req, res, next) {
  //  /** @type {types.DBConnection} */
  //  const db = res.locals.db;
  let err = null;

  try {
    const response = {
      data: [ `ok` ],
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

export default router;
