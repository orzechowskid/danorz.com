import express from 'express';
import session from 'express-session';
import passport from 'passport';

import {
  factory as apiRouterFactory
} from './api/index.js';
import {
  initDB
} from './db/index.js';

const ABOUT_ONE_MONTH_IN_MS = 1000 * 86400 * 30;

async function factory() {
  const db = await initDB();
  const app = express();

  app.use(express.json());
  app.use(function addDb(req, res, next) {
    res.locals.db = db;

    next();
  });
  app.set(`trust proxy`, 1);
  app.use(session({
    name: `session`,
    resave: false,
    saveUninitialized: false,
    secret: process.env.WEB_BACKEND_SESSION_SECRET,
    store: db.getSessionStore()
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  passport.use(db.createPassportStrategy());
  passport.serializeUser(db.serializeUser());
  passport.deserializeUser(db.deserializeUser());

  app.use((req, res, next) => { console.log(req.method, req.path, req.query, req.body); next(); });

  app.use(`/api/1`, apiRouterFactory(db));

  /* middleware with arguments.length of 4 is treated as an error handler */
  /* eslint-disable-next-line no-unused-vars */
  app.use(function(err, req, res, next) {
    console.warn(err);
    res.status(500).end();
  });

  return app;
}

export default factory;
