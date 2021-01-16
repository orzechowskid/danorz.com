import express from 'express';

import apiRouter from './api';
import {
  doStuff
} from './utils/index';

async function factory() {
  const app = express();

  app.use(`/api/1`, apiRouter);

  app.get(`*`, function getAny(req, res) {
    console.log(req.query);
    res.json({
      request: doStuff(req.method, req.path),
      response: "sup dogg"
    }).end();
  });

  return app;
}

export default factory;
