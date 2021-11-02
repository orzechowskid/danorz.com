import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import session from 'koa-session';
import passport from 'koa-passport';

import {
  factory as apiRouterFactory
} from './api/index.js';
import {
  initDB
} from './db/index.js';

async function factory() {
  const db = await initDB();
  const app = new Koa();
  const apiRouter = apiRouterFactory();

  /** @type {import('~/t').RouterMiddleware} */
  async function augmentContext(ctx, next) {
    ctx.db = db;

    await next();
  }

  /** @type {import('~/t').RouterMiddleware} */
  async function routeDiagnostics(ctx, next) {
    /* eslint-disable-next-line no-console */
    console.log(ctx.method, ctx.path, ctx.query, ctx.request.body);

    await next();
  }

  app.keys = [ process.env.WEB_BACKEND_SESSION_SECRET ];
  app.use(session({
    store: await db.getSessionStore()
  }, app));
  app.use(bodyParser());
  app.use(passport.initialize());
  app.use(passport.session());
  passport.use(db.getPassportStrategyFunction());
  passport.serializeUser(db.getSerializeUserFunction());
  passport.deserializeUser(db.getDeserializeUserFunction());
  app.use(augmentContext);
  app.use(routeDiagnostics);
  apiRouter.prefix(`/api/1`);
  app.use(apiRouter.routes());

  return app;
}

export default factory;
