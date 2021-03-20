import connectMongo from 'connect-mongo';
import session from 'express-session';
import mongoose from 'mongoose';

import * as Content from './content.js';
import * as LinkPreview from './linkpreview.js';
import * as Posts from './posts.js';
import * as User from './user.js';

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

    this.getContent = Content.getContent;

    this.createLinkPreview = LinkPreview.createLinkPreview;
    this.deleteLinkPreview = LinkPreview.deleteLinkPreview;
    this.getLinkPreview = LinkPreview.getLinkPreview;

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
  if (!process.env.WEB_BACKEND_DB_PASS
      || !process.env.WEB_BACKEND_DB_USER
      || !process.env.WEB_BACKEND_DB_URI) {
    throw new Error(`missing mongo user/pass or db uri`);
  }

  const auth = {
    password: process.env.WEB_BACKEND_DB_PASS,
    user: process.env.WEB_BACKEND_DB_USER
  };

  const connection = await mongoose.connect(
    process.env.WEB_BACKEND_DB_URI, {
      auth,
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  );

  Content.init(connection);
  LinkPreview.init(connection);
  Posts.init(connection);
  User.init(connection);

  return new DBConnection();
}

export {
  init
};
