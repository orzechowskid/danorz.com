import Router from '@koa/router';

import {
  ensureSignedIn
} from './utils.js';

const router = new Router();

router.get(
  `/:documentName`,
  async function getContent(ctx, next) {
    const db = ctx.db;
    const response = await db.getContent({
      which: {
        name: ctx.params.documentName
      }
    });

    ctx.status = 200;
    ctx.body = response;

    await next();
  });

router.post(
  `/:documentName`,
  ensureSignedIn,
  async function createContent(ctx, next) {
    const db = ctx.db;

    if (ctx.body.name !== ctx.params.documentName) {
      ctx.status = 400;
      ctx.body = undefined;
    }
    else {
      const response = await db.createContent({
        data: ctx.body
      });

      ctx.status = 201;
      ctx.body = response;
    }

    await next();
  });

router.put(
  `/:documentName`,
  ensureSignedIn,
  async function updateContent(ctx, next) {
    const db = ctx.db;
    const response = await db.updateContent({
      data: ctx.body,
      which: {
        name: ctx.params.documentName
      }
    });

    ctx.status = 200;
    ctx.body = response;

    await next();
  });

export default router;
