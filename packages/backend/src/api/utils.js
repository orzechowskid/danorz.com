/** @type {import('~/t').RouterMiddleware} */
function ensureSignedIn(ctx, next) {
  if (ctx.isUnauthenticated?.()) {
    ctx.response.status = 401;
  }

  next();
}

export {
  ensureSignedIn
};
