import mongoose from 'mongoose';
import mongoosePassportPlugin from 'passport-local-mongoose';

import {
  runStandardGetQuery
} from './utils.js';

/** @type {import('mongoose').SchemaOptions} */
const opts = {
  strict: `throw`
};

export const UserSchema = new mongoose.Schema({
  emailAddress: {
    index: {
      unique: true
    },
    type: String
  },
  name: String,
  permissions: {
    type: Object
  },
  preferredLocale: String
}, opts);

/* add hashpw/salt fields and (de-)serializer functions */
UserSchema.plugin(mongoosePassportPlugin, {
  usernameField: `name`
});

/** @type {import('./index').MongooseModel<import('dto').User>} */
const User = mongoose.model(`User`, UserSchema);

/** @type {import('~/t').DBWriteFunction<import('dto').UserCreate, import('dto').User>} */
export async function createUser(dbQuery) {
  let result;
  let total = -1;
  let error;

  try {
    const {
      data
    } = dbQuery;
    const {
      name,
      password
    } = data;
    const newUser = new User({
      name
    });

    const response = await new Promise(function doCreate(res, rej) {
      User.register(newUser, password, (err, u) => err ? rej(err) : res(u));
    });
    const {
      _id
    } = response;

    result = [].concat({
      _id, name
    });
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
  }
}

/** @type {import('~/t').DBQueryFunction<import('dto').User>} */
export async function getUser(dbQuery) {
  const x = runStandardGetQuery(User, dbQuery);

  return x;
}

/** @type {import('~/t').DBWriteFunction<import('dto').User>} */
export async function updateUser(dbQuery) {
  const {
    data,
    which
  } = dbQuery;
  let result;
  let total = -1;
  let error;

  try {
    const response = await User.findOneAndUpdate(which, {
      $set: data
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

/**
 * @return {import('passport').Strategy}
 */
export function createPassportStrategy() {
  return User.createStrategy();
}

/**
 * @return {(user: Object) => string} a User object serializer
 */
export function serializeUser() {
  return User.serializeUser();
}

/**
 * @return {(id: string) => Object} a User object deserializer
 */
export function deserializeUser() {
  return User.deserializeUser();
}
