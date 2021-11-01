import KoaSessionStore from 'koa-session-mongoose';
import {
  connect as MongooseConnect,
  connections as MongooseConnections
} from 'mongoose';

import * as Content from './content.js';
import * as LinkPreview from './linkpreview.js';
import * as Posts from './posts.js';
import * as Settings from './settings.js';
import * as User from './user.js';

function getSerializeUserFunction() {
  return User.serializeUser();
}

function getDeserializeUserFunction() {
  return User.deserializeUser();
}

function getPassportStrategyFunction() {
  return User.createPassportStrategy();
}

/** @type {import('~/t').DBConnection} */
class DBConnection {
  constructor() {
    /** @type {import('mongoose')} */
    this.connection = undefined;
    /** @type {import('koa-session').stores} */
    this.sessionStore = undefined;

    this.getSerializeUserFunction = getSerializeUserFunction;
    this.getDeserializeUserFunction = getDeserializeUserFunction;
    this.getPassportStrategyFunction = getPassportStrategyFunction;
  }

  async getSessionStore() {
    try {
      this.sessionStore = new KoaSessionStore({
        connection: this.connection
      });
    }
    catch (ex) {
      console.warn(ex.message);
    }

    return this.sessionStore;
  }

  async connect() {
    if (!process.env.WEB_BACKEND_DB_PASS
      || !process.env.WEB_BACKEND_DB_USER
      || !process.env.WEB_BACKEND_DB_URI) {
      throw new Error(`missing mongo user/pass or db uri`);
    }

    const auth = {
      password: process.env.WEB_BACKEND_DB_PASS,
      user: process.env.WEB_BACKEND_DB_USER
    };

    this.connection = await MongooseConnect(
      process.env.WEB_BACKEND_DB_URI, {
        auth,
        useCreateIndex: true,
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    );

    this.createContent = Content.createContent;
    this.getContent = Content.getContent;
    this.updateContent = Content.updateContent;

    this.createLinkPreview = LinkPreview.createLinkPreview;
    this.deleteLinkPreview = LinkPreview.deleteLinkPreview;
    this.getLinkPreview = LinkPreview.getLinkPreview;

    this.createBlogPostComment = Posts.addComment;
    this.getBlogPosts = Posts.getPosts;
    this.getBlogPostComments = Posts.getBlogPostComments;

    this.getSettings = Settings.getSettings;

    this.createUser = User.createUser;
    this.getUser = User.getUser;
    this.updateUser = User.updateUser;
  }

  async disconnect() {
  }
}

async function init() {
  if (!process.env.WEB_BACKEND_DB_PASS
      || !process.env.WEB_BACKEND_DB_USER
      || !process.env.WEB_BACKEND_DB_URI) {
    throw new Error(`missing mongo user/pass or db uri`);
  }

  const connection = new DBConnection();

  await connection.connect();

  return connection;
}

export {
  init
};
