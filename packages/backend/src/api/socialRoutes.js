import express from 'express';

import {
  ensureSignedIn
} from './utils.js';

const router = express.Router({
  mergeParams: true
});

router.get(
  `/feed`,
  ensureSignedIn,
  /** @type {import('~/t').RouteHandler} */
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

router.get(
  `/connect-requests`,
  ensureSignedIn,
  /** @type {import('~/t').RouteHandler} */
  async function getConnectRequests(req, res, next) {
    let err;

    try {
      const {
        count = 10,
        start = 0
      } = req.query;
      const {
        db
      } = res.locals;

      const result = await db.getRemotePeerRequests({
        count: +count,
        start: +start
      });

      res
        .status(200)
        .json(result);
    }
    catch (ex) {
      err = ex;
    }

    next(err);
  }
);

router.post(
  `/connect-requests`,
  /** @type {import('~/t').RouteHandler} */
  async function doConnectRequest(req, res, next) {
    let err;

    try {
      const {
        db
      } = res.locals;

      await db.createRemotePeerRequest({
        data: req.body
      });

      res
        .status(201)
        .end();
    }
    catch (ex) {
      err = ex;
    }

    next(err);
  }
);

router.post(
  `/connect-verify`,
  /** @type {import('~/t').RouteHandler} */
  async function doConnectVerify(req, res, next) {

  }
);

router.post(
  `/connect-confirm`,
  /** @type {import('~/t').RouteHandler} */
  async function doConnectConfirm(req, res, next) {

  }
);

export default router;
