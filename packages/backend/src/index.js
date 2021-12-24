import connectRedis from 'connect-redis';
import express from 'express';
import expressSession from 'express-session';
import passport from 'passport';
import * as redis from 'redis';

import {
  factory as apiRouterFactory
} from './api/index.js';
import {
  initDB
} from './db/index.js';

async function factory() {
  const db = await initDB();
  const SessionStore = connectRedis(expressSession);
  const app = express();
  const apiRouter = apiRouterFactory();

  db.configureUserAuth();

  app.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.WEB_BACKEND_SESSION_SECRET,
    store: new SessionStore({
      client: redis.createClient({
        url: process.env.WEB_BACKEND_SESSIONDB_URI
      })
    })
  }));
  app.use(express.json());
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(function log(req, res, next) {
    /* eslint-disable-next-line no-console */
    console.debug(`${req.method} ${req.path} ${JSON.stringify(req.body)}`);
    next();
  });
  app.use(function augment(req, res, next) {
    res.locals.db = db;

    next();
  });
  app.use(`/api/1`, apiRouter);

  return app;
}

export default factory;
