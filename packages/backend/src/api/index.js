import express from 'express';

import analyticsRouter from './analyticsRoutes.js';
import authRouter from './authRoutes.js';
import blogRouter from './blogRoutes.js';
import contentRouter from './contentRoutes.js';
import envRouter from './envRoutes.js';
import galleryRouter from './galleryRoutes.js';
import i18nRouter from './i18nRoutes.js';
import linkPreviewRouter from './linkpreview.js';
import socialRouter from './socialRoutes.js';

function factory() {
  const router = express.Router({
    mergeParams: true
  });

  router.use(`/analytics`, analyticsRouter);
  router.use(`/auth`, authRouter);
  router.use(`/blog`, blogRouter);
  router.use(`/content`, contentRouter);
  router.use(`/env`, envRouter);
  router.use(`/i18n`, i18nRouter);
  router.use(`/linkpreview`, linkPreviewRouter);
  router.use(`/media`, galleryRouter);
  router.use(`/social`, socialRouter);

  router.use(function onError(err, req, res, next) {
    console.error(err.stack);
    res.status(500).json({
      exception: err.message
    });
  });

  return router;
}

export {
  factory
};
