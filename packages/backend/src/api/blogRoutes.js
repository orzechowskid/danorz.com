import express from 'express';

const router = express.Router({
  mergeParams: true
});

// TODO: require auth for all blog routes?

router.get(
  `/posts`,
  /** @type {import('~/t').RouteHandler} */
  async function getBlogPosts(req, res, next) {
    try {
      const db = res.locals.db;

      // TODO: req.query
      const response = await db.getBlogPosts({
        count: 5
      });

      res.status(200).json(response);
    }
    catch (ex) {
      next(ex);
    }
  }
);

router.get(
  `/posts/:id`,
  /** @type {import('~/t').RouteHandler} */
  async function getSingleBlogPost(req, res, next) {
    try {
      const db = res.locals.db;
      const response = await db.getBlogPosts({
        which: {
          _id: req.params.id
        }
      });

      res.status(200).json(response);
    }
    catch (ex) {
      next(ex);
    }
  }
);

router.get(
  `/posts/:id/comments`,
  /** @type {import('~/t').RouteHandler} */
  async function getBlogPostComments(req, res, next) {
    try {
      const db = res.locals.db;
      const response = await db.getBlogPostComments({
        which: {
          id: req.params.id
        }
      });

      res.status(200).json(response);
    }
    catch (ex) {
      next(ex);
    }
  }
);

router.post(
  `/posts/:id/comments`,
  /** @type {import('~/t').RouteHandler} */
  async function createBlogPostComment(req, res, next) {
    try {
      const db = res.locals.db;
      const response = await db.createBlogPostComment({
        data: req.body,
        which: {
          id: req.params.id
        }
      });

      res.status(201).json(response);
    }
    catch (ex) {
      next(ex);
    }
  }
);

export default router;
