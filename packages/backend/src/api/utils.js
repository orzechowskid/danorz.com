/** @type {import('~/t').RouterMiddleware} */
function ensureSignedIn(ctx, next) {
  if (ctx.isAuthenticated?.()) {
    next();
  }
  else {
    ctx.response.status = 401;
  }
}

export {
  ensureSignedIn
};
