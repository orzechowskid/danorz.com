import Router from '@koa/router';

/** @type {import('~/t').ApiRouter} */
const router = new Router();

router.use(
  `/`,
  async function doAnalytics(ctx, next) {
    //  /** @type {types.DBConnection} */
    //  const db = ctx.db;
    const response = {
      data: [ `ok` ],
      metadata: {
        count: 1
      }
    };

    ctx.response.body = response;

    next();
  }
);

export default router;
