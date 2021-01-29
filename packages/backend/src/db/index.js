import * as types from '../types';

import {
  init
} from './mongo';

/**
 * @return {Promise<types.DBConnection>}
 */
async function initDB() {
  return init();
}

export {
  initDB
};
