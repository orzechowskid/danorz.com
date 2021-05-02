import express from 'express';

import {
  ensureSignedIn
} from './utils.js';

const router = express();

/* require auth on all private routes */
router.use(ensureSignedIn);

export default router;
