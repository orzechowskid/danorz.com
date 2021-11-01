import Router from '@koa/router';
import {
  getLinkPreview
} from 'link-preview-js';

import {
  ensureSignedIn
} from './utils.js';

const router = new Router();

router.get(
  `/`,
  async function getPreview(ctx, next) {
    const db = ctx.db;
    const slug = ctx.query.url.split(`://`)[1];
    const result = await db.getLinkPreview({
      which: {
        url: slug
      }
    });

    ctx.status = 200;
    ctx.body = result;

    await next();
  });

router.post(
  `/`,
  ensureSignedIn,
  async function createPreview(ctx, next) {
    const db = ctx.db;
    let result = null;
    let err = null;
    const slug = ctx.query.url.split(`://`)[1];

    result = await db.getLinkPreview({
      which: {
        url: slug
      }
    });

    if (result.metadata.total === 0) {
      /* already exists */
      ctx.status = 200;
    }
    else {
      const linkPreviewData = await getLinkPreview(ctx.query.url);

      result = await db.createLinkPreview({
        data: {
          metadata: linkPreviewData,
          url: slug
        }
      });

      ctx.status = 201;
    }

    ctx.body = result;

    await next();
  });

export default router;
