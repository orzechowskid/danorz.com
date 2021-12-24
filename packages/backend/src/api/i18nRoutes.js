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

const router = express.Router({
  mergeParams: true
});

router.get(
  `/`,
  /** @type {import('~/t').RouteHandler} */
  async function getLocales(req, res) {
    res.status(200).json(locales);
  }
);

router.get(
  `/locales/:locale/dictionary`,
  /** @type {import('~/t').RouteHandler} */
  async function getDictionaryForLocale(req, res, next) {
    const {
      locale
    } = req.params;
    const dictionary = getDictionary(locale);

    res.status(200).json(dictionary);
  }
);

export default router;
