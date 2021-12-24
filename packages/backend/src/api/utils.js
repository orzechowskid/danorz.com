/** @type {import('~/t').RouteHandler} */
function ensureSignedIn(req, res, next) {
  if (!req.user) {
    res.status(401).end();
  }
  else {
    next();
  }
}

export {
  ensureSignedIn
};
