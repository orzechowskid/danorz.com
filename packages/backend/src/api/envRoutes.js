import Router from '@koa/router';

import {
  ensureSignedIn
} from './utils.js';

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

router.patch(
  `/settings/:objName`,
  ensureSignedIn,
  async function updateSettingsObject(ctx, next) {
    const db = ctx.db;

    await db.updateSettings({
      data: ctx.request.body,
      which: {
        name: `site`
      }
    });

    ctx.status = 204;

    await next();
  }
);

export default router;
