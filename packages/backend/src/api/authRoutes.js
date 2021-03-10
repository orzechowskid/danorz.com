import * as types from '../types';

import express from 'express';
import passport from 'passport';

import {
  ensureSignedIn
} from './utils';

const router = express();

router.get(
  `/session`,
  ensureSignedIn,
  async function getExistingSession(req, res, next) {
    /** @type {types.DBConnection} */
    const db = res.locals.db;
    let err = null;

    try {
      const name = req.session.passport?.user;

      if (!name) {
        res.json({ data: [], metadata: { errors: [] }})
          .end();
      }
      else {
        const user = await db.getUser({
          which: {
            name
          }
        });

        res.json(user)
          .end();
      }
    }
    catch (ex) {
      err = ex;
    }

    next(err);
  }
);

router.post(
  `/session`,
  /* passport-local and mongo-connect do the heavy lifting here */
  passport.authenticate(`local`, { session: true }),
  async function handleAuth(req, res, next) {
    /** @type {types.DBConnection} */
    const db = res.locals.db;
    let err = null;

    try {
      const user = await db.getUser({
        which: {
          name: req.session.passport.user
        }
      });

      res.json(user)
        .end();
    }
    catch (ex) {
      err = ex;
    }

    next(err);
  });

router.delete(
  `/session`,
  ensureSignedIn,
  async function handleAuth(req, res, next) {
    let err = null;

    try {
      req.logOut();
      res.json({ data: [], metadata: { errors: [] } })
        .end();
    }
    catch (ex) {
      err = ex;
    }

    next(err);
  });

router.put(
  `/session`,
  ensureSignedIn,
  async function updateUser(req, res, next) {
    /** @type {types.DBConnection} */
    const db = res.locals.db;
    let err = null;

    try {
      const response = await db.updateUser({
        data: req.body,
        which: {
          name: req.session.passport.user
        }
      });

      res.status(200).json(response).end();
    }
    catch (ex) {
      err = ex;
    }

    next(err);
  });

router.post(
  `/user`,
  // TODO: auth
  async function createNewUser(req, res, next) {
    /** @type {types.DBConnection} */
    const db = res.locals.db;
    let err = null;

    try {
      const response = await db.createUser({
        data: req.body
      });

      res.status(200).json(response).end();
    }
    catch (ex) {
      err = ex;
    }

    next(err);
  });

export default router;
