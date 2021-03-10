function ensureSignedIn(req, res, next) {
  if (!req.session.passport?.user) {
    res.status(401).end();

    return;
  }

  next();
}

export {
  ensureSignedIn
};
