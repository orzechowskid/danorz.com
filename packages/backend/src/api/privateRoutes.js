import Router from '@koa/router';

// import {
//   ensureSignedIn
// } from './utils.js';

const router = new Router();

/* require auth on all private routes */
//router.use(ensureSignedIn);

export default router;
