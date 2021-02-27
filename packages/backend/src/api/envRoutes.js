import * as types from '../types';

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

export default router;
