import * as types from '../types';

import express from 'express';

import locales from '../../../translations/src/locales.json';
import enUS from '../../../translations/src/en-US.json';
import esES from '../../../translations/src/es-ES.json';

/**
 * @param {string} locale
 * @return {Object}
 */
function getDictionary(locale) {
  switch (locale.toLowerCase()) {
    case `en-us`: {
      return enUS;
    }
    case `es-es`: {
      return esES;
    }
    default: {
      // TODO: sniff Accept-Language http header?
      return enUS;
    }
  }
}

const router = express();

router.get(`/locales`, async function getLocales(req, res) {
  res.status(200).json(locales).end();
});

router.get(`/locales/:locale/dictionary`, async function getDictionaryForLocale(req, res, next) {
  let err = null;

  try {
    const {
      locale
    } = req.params;
    const dictionary = getDictionary(locale);

    res.status(200).json(dictionary).end();
  }
  catch (ex) {
    err = ex;
  }

  next(err);
});
// TODO: require auth for all blog routes

router.get(`/posts`, async function getBlogPosts(req, res, next) {
  /** @type {types.DBConnection} */
  const db = res.locals.db;
  let err = null;

  try {
    // TODO: req.query
    const response = await db.getBlogPosts({ count: 5 });

    res.json(response)
      .end();
  }
  catch (ex) {
    err = ex;
  }

  next(err);
});

router.get(`/posts/:id`, async function getSingleBlogPost(req, res, next) {
  /** @type {types.DBConnection} */
  const db = res.locals.db;
  let err = null;

  try {
    const response = await db.getBlogPost({
      which: {
        _id: req.params.id
      }
    });

    res.json(response)
      .end();
  }
  catch (ex) {
    err = ex;
  }

  next(err);
});

export default router;
