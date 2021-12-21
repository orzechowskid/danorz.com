import * as KoaRouter from '@koa/router';
import {
  BlogPost,
  SettingsUpdate,
  SiteSettings,
  User
} from 'dto';
import * as Koa from 'koa';
import * as KoaSession from 'koa-session';
import * as Passport from 'passport';

export type Id = string;

export type Indexed<Payload> = Payload & {
  _id: Id;
}

export interface DBQuery<Payload, WritePayload = Partial<Indexed<Payload>>> {
  count?: number; /* return this many things upon read */
  data?: WritePayload; /* create/update body */
  start?: number; /* start here upon read */
  which?: Partial<Indexed<Payload>> /* only read/delete these things */
}

export interface DBQueryResult<Payload> {
  data: Indexed<Payload>[];
  metadata: {
    error?: string;
    total?: number;
  }
}

export type DBQueryFunction<Payload> = (dbQuery: DBQuery<Payload, void>) => Promise<DBQueryResult<Payload>>;
export type DBWriteFunction<WritePayload, Payload = WritePayload> = (dbQuery: DBQuery<Payload, WritePayload>) => Promise<DBQueryResult<Payload>>;

export interface DBConnection {
  disconnect: () => Promise<void>;
  getDeserializeUserFunction: () => (id: string) => Object; // User
  getPassportStrategyFunction: () => Passport.Strategy;
  getSerializeUserFunction: () => (user: Object, done: any) => string;
  getSessionStore: () => Promise<KoaSession.stores>;

  getBlogPosts: DBQueryFunction<BlogPost>;
  getSettings: DBQueryFunction<SiteSettings>;
  getUser: DBQueryFunction<User>;
  updateSettings: DBWriteFunction<SettingsUpdate, SiteSettings>;
}

export interface Storage {
  createFolder: (opts: {
    name: string
  }) => Promise<void>;
  getBaseUrl: () => Promise<string>;
  getFolderContents: (opts: {
    name: string
  }) => Promise<void>;
  getObject: (opts: {
    path: string
  }) => Promise<{
    data: unknown;
    mimeType: string;
  }>;
  uploadObject: (opts: {
    data: Buffer,
    fileName: string,
    folderName: string,
    mimeType: string
  }) => Promise<{
    path: string
  }>;
}

type CustomContext = Koa.Context & {
  db: DBConnection;
  storage: Storage;
}

export type ApiRouter = KoaRouter<Koa.DefaultState, CustomContext>;
export type RouterMiddleware<ResponseBody = any> = Koa.Middleware<Koa.DefaultState, CustomContext, ResponseBody>;
