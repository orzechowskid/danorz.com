import {
  connect as MongooseConnect
} from 'mongoose';
import passport from 'passport';

import * as Content from './content.js';
import * as LinkPreview from './linkpreview.js';
import * as Posts from './posts.js';
import * as Settings from './settings.js';
import * as User from './user.js';

/** @type {import('~/t').DBConnection} */
class DBConnection {
  constructor() {
    /** @type {import('mongoose')} */
    this.connection = undefined;
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
    this.updateSettings = Settings.updateSettings;

    this.createUser = User.createUser;
    this.getUser = User.getUser;
    this.updateUser = User.updateUser;
  }

  async disconnect() {
    /* HMR support in development envs, since mongoose doesn't support the
     * re-declaration of models and schemas */
    // @ts-ignore
    delete this.connection.models;
    // @ts-ignore
    this.connection.models = {};
  }

  configureUserAuth() {
    passport.use(User.createPassportStrategy());
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());
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
