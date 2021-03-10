import connectMongo from 'connect-mongo';
import session from 'express-session';
import mongoose from 'mongoose';

import * as Posts from './posts';
import * as User from './user';

function serializeUser() {
  return User.serializeUser();
}

function deserializeUser() {
  return User.deserializeUser();
}

function createPassportStrategy() {
  return User.createPassportStrategy();
}

class DBConnection {
  constructor() {
    this.serializeUser = serializeUser;
    this.deserializeUser = deserializeUser;
    this.createPassportStrategy = createPassportStrategy;

    this.getBlogPosts = Posts.getPosts;

    this.createUser = User.createUser;
    this.getUser = User.getUser;
    this.updateUser = User.updateUser;
  }

  getSessionStore() {
    if (!this.mongoStore) {
      const MongoStore = connectMongo(session);

      this.mongoStore = new MongoStore({
        mongooseConnection: mongoose.connections[0]
      });
    }

    return this.mongoStore;
  }
}

async function init() {
  if (!process.env.DB_PASS
      || !process.env.DB_USER
      || !process.env.DB_URI) {
    throw new Error(`missing mongo user/pass or db uri`);
  }

  const auth = {
    password: process.env.DB_PASS,
    user: process.env.DB_USER
  };

  const connection = await mongoose.connect(
    process.env.DB_URI, {
      auth,
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  );

  Posts.init(connection);
  User.init(connection);

  return new DBConnection();
}

export {
  init
};
