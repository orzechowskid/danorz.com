import Router from '@koa/router';
import passport from 'koa-passport';

import {
  ensureSignedIn
} from './utils.js';

/** @type {import('~/t').ApiRouter} */
const router = new Router();

router.get(
  `/session`,
  ensureSignedIn,
  async function getSession(ctx) {
    ctx.response.status = 200;
    ctx.response.body = {
      data: [{
        isLoggedIn: true,
        name: ctx.state.user.name
      }],
      metadata: {
        count: 1,
        error: null
      }
    };
  }
);

router.post(
  `/session`,
  /* koa-passport and passport-local do the heavy lifting here */
  async function handleAuth(ctx, next) {
    return passport.authenticate(`local`,
      /** @param {import('dto').User} user */
      async function(err, user) {
        if (err) {
          ctx.response.status = 401;
        }
        else {
          await ctx.login(user);

          ctx.response.status = 201;
          ctx.response.body = {
            data: [{
              isLoggedIn: true,
              name: user.name
            }],
            metadata: {
              count: 1,
              error: null
            }
          };
        }
      })(ctx, next)
  }
);

router.delete(
  `/session`,
  ensureSignedIn,
  async function handleAuth(ctx, next) {
    ctx.logout();

    ctx.status = 200;

    await next();
  });

export default router;
