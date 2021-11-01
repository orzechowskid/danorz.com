import Router from '@koa/router';

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

/** @type {import('~/t').ApiRouter} */
const router = new Router();

router.get(
  `/`,
  async function getLocales(ctx, next) {
    ctx.status = 200;
    ctx.body = locales;

    await next();
  }
);

router.get(
  `/locales/:locale/dictionary`,
  async function getDictionaryForLocale(ctx, next) {
    const {
      locale
    } = ctx.params;
    const dictionary = getDictionary(locale);

    ctx.status = 200;
    ctx.body = dictionary;

    await next();
  }
);

export default router;
