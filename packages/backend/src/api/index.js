import express from 'express';

import analyticsRoutes from './analyticsRoutes';
import blogRoutes from './blogRoutes';
import envRoutes from './envRoutes';
import i18nRoutes from './i18nRoutes';
import privateRoutes from './privateRoutes';

function factory(dbConnection) {
  const router = express();

  router.use(function addDB(req, res, next) {
    res.locals.db = dbConnection;

    next();
  });

  router.use(function noCors(req, res, next) {
    res.header(`Access-Control-Allow-Headers`, `Content-Type`); // todo: wildcard?
    res.header(`Access-Control-Allow-Origin`, `*`);
    next();
  });

  router.use(`/analytics`, analyticsRoutes);
  router.use(`/blog`, blogRoutes);
  router.use(`/env`, envRoutes);
  router.use(`/i18n`, i18nRoutes);
  router.use(`/my`, privateRoutes);

  return router;
}

export {
  factory
};
