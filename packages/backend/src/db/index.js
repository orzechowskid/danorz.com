import {
  init as initMongo
} from './mongo/index.js';

/**
 * @return {Promise<import('~/t').DBConnection>}
 */
async function initDB() {
  // switch process.env.WEB_BACKEND_DB_DRIVER
  return initMongo();
}

export {
  initDB
};
