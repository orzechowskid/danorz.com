import express from 'express';

import analyticsRoutes from './analyticsRoutes';
import authRoutes from './authRoutes';
import blogRoutes from './blogRoutes';
import envRoutes from './envRoutes';
import i18nRoutes from './i18nRoutes';
import privateRoutes from './privateRoutes';

function factory() {
  const router = express.Router({
    mergeParams: true
  });

  router.use(`/analytics`, analyticsRoutes);
  router.use(`/auth`, authRoutes);
  router.use(`/blog`, blogRoutes);
  router.use(`/env`, envRoutes);
  router.use(`/i18n`, i18nRoutes);
  router.use(`/my`, privateRoutes);

  return router;
}

export {
  factory
};
