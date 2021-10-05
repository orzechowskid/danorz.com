import {
  FunctionComponent
} from 'preact';
import * as PreactHooks from 'preact/hooks';
import { SWRConfiguration, SWRResponse } from 'swr';

export type Id = string;

export type Indexed<T> = T & {
  _id?: Id;
};

export type Component<Props> = FunctionComponent<Props>;

export type LocalStateSetter<T> = T | ((arg0: T) => T);
export type LocalState<T> = [
  T,
  PreactHooks.StateUpdater<T>
];

export interface RemoteData<T> {
  data: Indexed<T>[];
  metadata: {
    count?: number;
    error?: string;
  }
}

export interface RemoteDataOpts {
  apiEndpoint: string;
  cacheKey?: string;
  fetchOpts?: SWRConfiguration & {
    createOpts?: RequestInit;
    deleteOpts?: RequestInit;
    raw?: boolean;
    updateOpts?: RequestInit;
  };
}

export interface RemoteMetadata {
  error?: string;
  total?: number;
}

export interface RemoteOperation<Request, Response = Promise<void>> {
  busy: boolean;
  error?: string | Error;
  execute: (arg0: Request) => Response;
}

/* a container for manipulating a single piece of backend data */
export interface RemoteResource<Payload, CreateShape = Partial<Payload>, DeleteShape = void, UpdateShape = Payload> {
  busy: boolean;
  data?: Payload;
  doCreate: RemoteOperation<CreateShape>;
  doDelete: RemoteOperation<DeleteShape>;
  doUpdate: RemoteOperation<UpdateShape>;
  error?: string | Error;
  metadata?: RemoteMetadata;
}

/* a container for manipulating a collection of backend data */
export interface RemoteCollection<Payload, CreateShape = Partial<Payload>, DeleteShape = Id, UpdateShape = Payload> {
  busy: boolean;
  data?: Indexed<Payload>[];
  doCreate: RemoteOperation<CreateShape>;
  doDelete: RemoteOperation<DeleteShape>;
  doUpdate: RemoteOperation<UpdateShape>;
  error?: string | Error;
  metadata?: RemoteMetadata;
}

export type SWR<Payload> = SWRResponse<RemoteData<Partial<Payload>>, (string|Error)>;

export interface BlogPostComment {
  gravatarHash: string;
  name: string;
  text: string;
  timestamp: string;
}

export interface BlogPost {
  author: string;
  comments: BlogPostComment[];
  tags: string[];
  text: string;
  title: string;
}

export interface UseBlogPost {
  id: string;
}

export interface UseBlogPostComments {
  id: string;
  initialData?: BlogPostComment[];
}

export interface UseAnimateElementOptions {
  className?: string;
  delay?: number;
  duration?: number;
  onEnd?: () => void;
  onStart?: () => void;
  ref: PreactHooks.Ref<HTMLElement>;
}

export interface AnalyticsEvent {
  eventType: string;
  eventData?: string; /* serialized JSON */
}
