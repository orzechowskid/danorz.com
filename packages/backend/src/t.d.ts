import * as KoaRouter from '@koa/router';
import {
  Settings,
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

export interface BlogPostComment {
  name: string;
  text: string;
  timestamp: string; /* ISO-8601 */
}

export interface BlogPost {
  author: string;
  comments: BlogPostComment[];
  peerResourceId?: string;
  tags: string[];
  timestamp: string; /* ISO-8601 */
  title: string;
}

export interface GalleryItem {
  description?: string;
  mimeType: string;
  path: string;
  thumbnailPath: string;
  timestamp: string; /* ISO-8601 */
}

export interface PhotoGallery {
  items: GalleryItem[];
  name: string;
}

export interface DBConnection {
  disconnect: () => Promise<void>;
  getDeserializeUserFunction: () => (id: string) => Object; // User
  getPassportStrategyFunction: () => Passport.Strategy;
  getSerializeUserFunction: () => (user: Object, done: any) => string;
  getSessionStore: () => Promise<KoaSession.stores>;

  getBlogPosts: DBQueryFunction<BlogPost>;
  getSettings: DBQueryFunction<Settings>;
  getUser: DBQueryFunction<User>;
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

// export interface ApiRouteLocals {
//   db: DBConnection;
//   storage: Storage;
// }

// export type ApiRouteHandler<Payload, RouteParams = any, ReqQuery = void, ReqBody = void> = RequestHandler<RouteParams, DBQueryResult<Payload>, ReqBody, ReqQuery, ApiRouteLocals>;

// export type CreateApiRouteHandler<Payload, RouteParams = void> = ApiRouteHandler<Payload, RouteParams, Indexed<Payload>>;

// export type MediaRouteHandler<RouteParams = any> = RequestHandler<RouteParams, any, any, any, ApiRouteLocals>;


type CustomContext = Koa.Context & {
  db: DBConnection;
  storage: Storage;
}

export type ApiRouter = KoaRouter<Koa.DefaultState, CustomContext>;
export type RouterMiddleware<ResponseBody = any> = Koa.Middleware<Koa.DefaultState, CustomContext, ResponseBody>;
