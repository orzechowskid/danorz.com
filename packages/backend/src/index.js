import express from 'express';

import {
  factory as apiRouterFactory
} from './api';
import {
  initDB
} from './db/index';

async function factory() {
  const app = express();
  const dbConnection = await initDB();

  app.use(`/api/1`, apiRouterFactory(dbConnection));

  /* middleware with arguments.length of 4 is treated as an error handler */
  /* eslint-disable-next-line no-unused-vars */
  app.use(function(err, req, res, next) {
    console.warn(err);
    res.status(500).end();
  });

  return app;
}

export default factory;
