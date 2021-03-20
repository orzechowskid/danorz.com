import * as types from '../types.js';

import {
  init
} from './mongo/index.js';

/**
 * @return {Promise<types.DBConnection>}
 */
async function initDB() {
  return init();
}

export {
  initDB
};
