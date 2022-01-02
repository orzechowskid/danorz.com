import md5 from 'md5.js';

/** @type {import('~/t').RouteHandler} */
function ensureSignedIn(req, res, next) {
  if (!req.user) {
    res.status(401).end();
  }
  else {
    next();
  }
}

/**
 * @param {string} originalFilename
 * @return {string}
 */
function normalizeFilename(originalFilename) {
  const idx = originalFilename.indexOf(`.`);

  if (idx === -1) {
    return originalFilename;
  }

  return new md5()
    .update(originalFilename.slice(0, idx))
    .digest(`hex`)
    .concat(originalFilename.slice(idx - 1));
}

export {
  ensureSignedIn,
  normalizeFilename
};
