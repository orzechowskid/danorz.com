import bodyParser from 'body-parser';
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
import {
  factory as mediaRouterFactory
} from './media/index.js';
import {
  initStorage
} from './storage/index.js';

async function factory() {
  const [ db, storage ] = await Promise.all([
    initDB(),
    initStorage()
  ]);
  const SessionStore = connectRedis(expressSession);
  const app = express();
  const [ apiRouter, mediaRouter ] = await Promise.all([
    apiRouterFactory(),
    mediaRouterFactory({
      db,
      storage
    })
  ]);

  db.configureUserAuth();

  app.use(bodyParser.json());
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
  app.use(passport.initialize());
  app.use(passport.session());

  if (process.env.NODE_ENV !== `production`) {
    app.use(function log(req, res, next) {
      /* eslint-disable-next-line no-console */
      console.debug(`${req.method} ${req.path} ${JSON.stringify(req.body)}`);
      next();
    });
  }

  app.use(function augment(req, res, next) {
    res.locals.db = db;
    res.locals.storage = storage;

    next();
  });
  app.use(`/api/1`, apiRouter);
  app.use(`/media`, mediaRouter);

  return app;
}

export default factory;
