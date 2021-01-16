import express from 'express';

import blogRoutes from './blogRoutes';
import privateRoutes from './privateRoutes';

const router = express();

router.use(function noCors(req, res, next) {
  res.header(`Access-Control-Allow-Origin`, `*`);
  next();
});

router.use(`/blog`, blogRoutes);
router.use(`/my`, privateRoutes);

export default router;
