import Router from '@koa/router';

import analyticsRouter from './analyticsRoutes.js';
import authRouter from './authRoutes.js';
import blogRouter from './blogRoutes.js';
import contentRouter from './contentRoutes.js';
import envRouter from './envRoutes.js';
import i18nRouter from './i18nRoutes.js';
import linkPreviewRouter from './linkpreview.js';
import privateRouter from './privateRoutes.js';

function factory() {
  const router = new Router();

  router.use(`/analytics`, analyticsRouter.routes(), analyticsRouter.allowedMethods());
  router.use(`/auth`, authRouter.routes());
  router.use(`/blog`, blogRouter.routes());
  router.use(`/content`, contentRouter.routes());
  router.use(`/i18n`, i18nRouter.routes(), i18nRouter.allowedMethods());
  router.use(`/env`, envRouter.routes(), envRouter.allowedMethods());
  router.use(`/linkpreview`, linkPreviewRouter.routes());
  router.use(`/my`, privateRouter.routes());

  return router;
}

export {
  factory
};
