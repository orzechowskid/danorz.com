import express from 'express';

import {
  ensureSignedIn
} from './utils.js';

const router = express.Router({
  mergeParams: true
});

router.get(
  `/feed`,
  /** @type {import('~/t').RouteHandler} */
  ensureSignedIn,
  async function getFeed(req, res, next) {
    let err;

    try {
      res.status(200).json({
        data: [{
          _id: `aaaaaaaaaaaaa`,
          remotePeerId: `deadbeef`
        }],
        metadata: {
          count: 1
        }
      });
    }
    catch (ex) {
      err = ex;
    }

    next(err);
  }
);

export default router;
