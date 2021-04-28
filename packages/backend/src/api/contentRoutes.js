import express from 'express';

import * as types from '../types.js';

import {
  ensureSignedIn
} from './utils.js';

const router = express();

router.get(
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

router.post(
  `/:documentName`,
  ensureSignedIn,
  async function createContent(req, res, next) {
    /** @type {types.DBConnection} */
    const db = res.locals.db;
    let err = null;

    if (req.body.name !== req.params.documentName) {
      res.status(400).end();
    }
    else {
      try {
        const response = await db.createContent({
          data: req.body
        });

        res.json(response)
          .end();
      }
      catch (ex) {
        err = ex;
      }
    }

    next(err);
  });

router.put(
  `/:documentName`,
  ensureSignedIn,
  async function updateContent(req, res, next) {
    /** @type {types.DBConnection} */
    const db = res.locals.db;
    let err = null;

    try {
      const response = await db.updateContent({
        data: req.body,
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
