import Router from '@koa/router';

const router = new Router();

// TODO: require auth for all blog routes

router.get(
  `/posts`,
  async function getBlogPosts(ctx, next) {
    const db = ctx.db;

    // TODO: req.query
    const response = await db.getBlogPosts({
      count: 5
    });

    ctx.status = 200;
    ctx.body = response;

    await next();
  });

router.get(
  `/posts/:id`,
  async function getSingleBlogPost(ctx, next) {
    const db = ctx.db;
    const response = await db.getBlogPosts({
      which: {
        _id: ctx.params.id
      }
    });

    ctx.status = 200;
    ctx.body = response;

    await next();
  });

router.get(
  `/posts/:id/comments`,
  async function getBlogPostComments(ctx, next) {
    const db = ctx.db;
    const response = await db.getBlogPostComments({
      which: {
        id: ctx.params.id
      }
    });

    ctx.status = 200;
    ctx.body = response;

    await next();
  });

router.post(
  `/posts/:id/comments`,
  async function createBlogPostComment(ctx, next) {
    const db = ctx.db;
    const response = await db.createBlogPostComment({
      data: ctx.body,
      which: {
        id: ctx.params.id
      }
    });

    ctx.status = 201;
    ctx.body = response;

    await next();
  });

export default router;
