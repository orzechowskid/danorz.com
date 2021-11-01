import Router from '@koa/router';

/** @type {import('~/t').ApiRouter} */
const router = new Router();

router.get(
  `/settings`,
  async function getSettings(ctx, next) {
    const db = ctx.db;
    const response = await db.getSettings({
      which: {
        name: `site`
      }
    });

    ctx.status = 200;
    ctx.body = response;

    await next();
  }
);

export default router;
