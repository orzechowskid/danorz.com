import * as types from '../types';

import express from 'express';

const router = express();

// TODO: require auth for all blog routes

router.get(`/posts`, async function getBlogPosts(req, res, next) {
  /** @type {types.DBConnection} */
  const db = res.locals.db;
  let err = null;

  try {
    // TODO: req.query
    const response = await db.getBlogPosts({ count: 5 });

    res.json(response)
      .end();
  }
  catch (ex) {
    err = ex;
  }

  next(err);
});

router.get(`/posts/:id`, async function getSingleBlogPost(req, res, next) {
  /** @type {types.DBConnection} */
  const db = res.locals.db;
  let err = null;

  try {
    const response = await db.getBlogPosts({
      which: {
        _id: req.params.id
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
