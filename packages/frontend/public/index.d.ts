import * as Preact from 'preact';

type DataId = string;

interface RemoteDataOperationOpts {
  apiEndpoint?: string;
  fetchOpts: RequestInit;
}

interface RemoteDataOpts {
  apiEndpoint: string;
  opts?: {
    createOpts?: RemoteDataOperationOpts;
    deleteOpts?: RemoteDataOperationOpts;
    raw: boolean;
    updateOpts?: RemoteDataOperationOpts;
  };
}

interface RemoteDataSpecialCase<T, CReq, CRes, DReq, DRes, UReq, URes> {
  data: T;
  doCreate: (payload: CReq) => Promise<CRes>;
  doDelete: (payload: DReq) => Promise<DRes>;
  doUpdate: (payload: UReq) => Promise<URes>;
  error?: string;
}

type RemoteDataItem<T> = RemoteDataSpecialCase<T, Omit<T, '_id'>, T, void, void, Partial<T>, T>;

type RemoteDataList<T> = RemoteDataSpecialCase<T[], Omit<T, '_id'>, T, DataId, void, Partial<T>, T>;

type RemoteDataResult<T> = RemoteDataItem<T> | RemoteDataList<T>;

type BannerSeverity = 'info' | 'warning';

interface SiteBanner {
  _id: DataId;
  dismissable: boolean;
  severity: BannerSeverity;
  text: string;
}

type LocalStateSetter<T> = T | (() => T);

type LocalState<T> = [ T, (arg0: LocalStateSetter<T>) => void ];

interface LocalStorage<T> {
  data: T;
  update: (newValue: T) => void;
}

type BannerInfo = Record<DataId, boolean>;

interface RestrictedProps {
  children: any;
  ifSignedIn?: boolean;
  ifSiteSettingEnabled?: string;
}

interface PageTitleProps {
  title: string | (() => string);
}

interface PageTitleContainerProps {
  children: any;
}

/* "HTMLElement" is a little bit of a lie but good enough for now */
type Component<T> = (props: T) => (HTMLElement | null);

interface PrivateRouteProps {
  children: any;
}

interface I18nFunctions {
  date: (value: Date, args?: Object) => string;
  num: (value: number) => string;
  t: (key: string, values?: Object) => string;
  time: (date: Date, args?: Object) => string;
}
