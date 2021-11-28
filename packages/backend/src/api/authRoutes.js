import Router from '@koa/router';
import passport from 'passport';

import {
  ensureSignedIn
} from './utils.js';

/** @type {import('~/t').ApiRouter} */
const router = new Router();

router.get(
  `/session`,
  ensureSignedIn,
  async function getSession(ctx, next) {
    ctx.status = 200;
    ctx.response.body = {
      isLoggedIn: true
    };

    await next();
  }
);

router.post(
  `/session`,
  /* koa-passport and passport-local do the heavy lifting here */
  passport.authenticate(`local`, {
    session: true
  }),
  async function handleAuth(ctx, next) {
    ctx.status = 201;

    await next();
  });

router.delete(
  `/session`,
  ensureSignedIn,
  async function handleAuth(ctx, next) {
    ctx.logout();

    ctx.status = 200;

    await next();
  });

export default router;
