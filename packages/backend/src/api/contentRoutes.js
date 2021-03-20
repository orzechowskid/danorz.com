import * as types from '../types.js';

import express from 'express';

const router = express();

router.use(
  `/:documentName`,
  async function getContent(req, res, next) {
    /** @type {types.DBConnection} */
    const db = res.locals.db;
    let err = null;

    try {
      const response = await db.getContent({
        which: {
          name: req.params.documentName
        }
      });

      res.json(response)
        .end();
    }
    catch (ex) {
      err = ex;
    }

    next(err);
  });

export default router;
