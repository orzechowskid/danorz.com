import * as types from '../../types.js';

import mongoose from 'mongoose';

import {
  runStandardGetQuery
} from './utils.js';

const opts = {
  collection: `settings`,
  strict: `throw`
};

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

let Settings = null;

/** @type {types.DBQueryFunction<types.Settings>} */
export async function getSettings(dbQuery) {
  return runStandardGetQuery(Settings, dbQuery);
}

/** @type {types.DBQueryFunction<types.Settings>} */
export async function updateSettings(dbQuery) {
  const {
    data,
    which
  } = dbQuery;
  let result;
  let total = -1;
  let error;

  try {
    const response = await Settings.findOneAndUpdate(which, { $set: data }, { lean: true, new: true }).exec();

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

export function init(dbConnection) {
  Settings = dbConnection.model(`Settings`, SettingsSchema);
}
