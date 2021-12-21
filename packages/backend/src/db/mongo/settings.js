import mongoose from 'mongoose';

import {
  runStandardSingleItemQuery
} from './utils.js';

/** @type {import('mongoose').SchemaOptions} */
const opts = {
  collection: `settings`,
  strict: `throw`
};

/** @type {import('mongoose').Schema<import('dto').SiteSettings>} */
export const SettingsSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String
  },
  values: {
    required: true,
    type: Object
  }
}, opts);

const Settings = mongoose.model(`Settings`, SettingsSchema);

/** @type {import('~/t').DBQueryFunction<import('dto').SiteSettings>} */
export async function getSettings(dbQuery) {
  return runStandardSingleItemQuery(Settings, dbQuery);
}

/** @type {import('~/t').DBWriteFunction<import('dto').SettingsUpdate, import('dto').SiteSettings>} */
export async function updateSettings(dbQuery) {
  const {
    data,
    which
  } = dbQuery;
  let result;
  let total = -1;
  let error;

  try {
    const response = await Settings.findOneAndUpdate(which, {
      $set: {
        [`${data.path}.value`]: data.value
      }
    }, {
      lean: true, new: true
    }).exec();

    result = [].concat(response);
    total = 1;
  }
  catch (ex) {
    error = ex.message;
  }

  return {
    data: result,
    metadata: {
      error,
      total
    }
  };
}
