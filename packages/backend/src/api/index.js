import express from 'express';

import analyticsRoutes from './analyticsRoutes.js';
import authRoutes from './authRoutes.js';
import blogRoutes from './blogRoutes.js';
import contentRoutes from './contentRoutes.js';
import envRoutes from './envRoutes.js';
import i18nRoutes from './i18nRoutes.js';
import linkPreviewRoutes from './linkpreview.js';
import privateRoutes from './privateRoutes.js';

function factory() {
  const router = express.Router({
    mergeParams: true
  });

  router.use(`/analytics`, analyticsRoutes);
  router.use(`/auth`, authRoutes);
  router.use(`/blog`, blogRoutes);
  router.use(`/content`, contentRoutes);
  router.use(`/env`, envRoutes);
  router.use(`/i18n`, i18nRoutes);
  router.use(`/linkpreview`, linkPreviewRoutes);
  router.use(`/my`, privateRoutes);

  return router;
}

export {
  factory
};
