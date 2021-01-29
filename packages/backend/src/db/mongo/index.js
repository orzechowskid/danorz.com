import mongoose from 'mongoose';

import * as Posts from './posts';

class DBConnection {
  constructor(connection) {
    this.connection = connection;
  }

  getBlogPosts(...args) {
    return Posts.getPosts(...args);
  }
}

async function init() {
  if (!process.env.DB_PASS
      || !process.env.DB_USER
      || !process.env.DB_URI) {
    throw new Error(`missing mongo user/pass or db uri`);
  }

  const connection = await new Promise(function getConnection(res, rej) {
    const auth = {
      password: process.env.DB_PASS,
      user: process.env.DB_USER
    };
    const connectionInstance = mongoose.createConnection(
      process.env.DB_URI, {
        auth,
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    );

    connectionInstance.once(`open`, async function onConnect() {
      console.info(`connected to database`);
      Posts.init(connectionInstance);
      res(new DBConnection(connectionInstance));
    });
  });

  return connection;
}

export {
  init
};
