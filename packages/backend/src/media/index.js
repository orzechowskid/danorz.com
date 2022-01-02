import express from 'express';

/**
 * @typedef Services
 * @property {import('~/t').Storage} storage
 */

/**
 * @param {Services} services
 */
async function factory(services) {
  const {
    storage
  } = services;
  const router = express.Router();

  router.get(
    `/galleries/:gid/:pid`,
    async function servePhoto(req, res, next) {
      try {
        const path = req.url.slice(1).split(`/`).slice(1).join(`/`);
        const data = await storage.getObject({
          path: `galleries/${path}`
        });

        res.status(200)
          .header(`content-type`, data.mimeType)
          .send(data.data);
      }
      catch (ex) {
        next(ex);
      }
    }
  );

  router.get(
    `/galleries/:gid/thumbnails/:pid`,
    async function serveThumbnail(req, res, next) {
      try {
        const path = req.url.slice(1).split(`/`).slice(1).join(`/`);
        const data = await storage.getObject({
          path: `galleries/${path}`
        });

        res.status(200)
          .header(`content-type`, data.mimeType)
          .send(data.data);
      }
      catch (ex) {
        next(ex);
      }
    }
  );

  return router;
}

export {
  factory
};
