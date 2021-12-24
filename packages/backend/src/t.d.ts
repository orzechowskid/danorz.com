import {
  BlogPost,
  Id,
  Indexed,
  SettingsUpdate,
  SiteSettings,
  User
} from 'dto';
import {
  NextFunction,
  Request,
  Response
} from 'express';

export interface AugmentedResponse extends Response {
  locals: {
    db: DBConnection;
  }
}

export interface SignedInRequest extends Request {
  session: {
    passport: {
      user: string;
    }
  };
  user: User;
}

export type RouteHandler = (req: Request, res: AugmentedResponse, next: NextFunction) => (void | Promise<void>);

export type SignedInRouteHandler = (req: SignedInRequest, res: AugmentedResponse, next: NextFunction) => (void|Promise<void>);

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
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  configureUserAuth: () => void;

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
