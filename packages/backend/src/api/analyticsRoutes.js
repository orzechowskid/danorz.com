import Router from '@koa/router';

/** @type {import('~/t').ApiRouter} */
const router = new Router();

router.post(
  `/event`,
  async function recordEvent(ctx, next) {
    const event = JSON.parse(Buffer.from(ctx.request.body.event, `base64`).toString());

    ctx.body = {
      data: [ event ],
      metadata: {
        count: 1
      }
    };
    ctx.status = 201;

    await next();
  }
);

export default router;
