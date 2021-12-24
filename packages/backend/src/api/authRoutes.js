import express from 'express';
import passport from 'passport';

import {
  ensureSignedIn
} from './utils.js';

const router = express.Router();

router.get(
  `/session`,
  ensureSignedIn,
  /** @type {import('~/t').SignedInRouteHandler} */
  async function getSession(req, res) {
    res.status(200).json({
      data: [{
        isLoggedIn: true,
        name: req.user.name
      }],
      metadata: {
        count: 1,
        error: null
      }
    });
  }
);

router.post(
  `/session`,
  passport.authenticate(`local`),
  /** @type {import('~/t').SignedInRouteHandler} */
  function onCreateSession(req, res) {
    res.status(201).json({
      data: [{
        isLoggedIn: true,
        name: req.user.name
      }],
      metadata: {
        count: 1,
        error: null
      }
    });
  }
);

router.delete(
  `/session`,
  ensureSignedIn,
  /** @type {import('~/t').SignedInRouteHandler} */
  async function handleAuth(req, res) {
    req.logout();
    res.status(205).end();
  }
);

export default router;
