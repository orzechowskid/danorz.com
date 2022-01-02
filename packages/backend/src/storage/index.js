import {
  init as initS3
} from './aws-s3/index.js';

async function initStorage() {
  return initS3();
}

export {
  initStorage
};
