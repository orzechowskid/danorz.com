import Router from '@koa/router';

import {
  ensureSignedIn
} from './utils.js';

const router = new Router();

/* require auth on all private routes */
//router.use(ensureSignedIn);

router.get(
  `/settings`,
  ensureSignedIn,
  async function getSettings(ctx, next) {
  }
);

export default router;
