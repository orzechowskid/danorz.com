import {
  FunctionComponent
} from 'preact';
import * as PreactHooks from 'preact/hooks';

export type Id = string;

export type Component<Props> = FunctionComponent<Props>;

export type LocalStateSetter<T> = T | ((arg0: T) => T);
export type LocalState<T> = [ T, (arg0: LocalStateSetter<T>) => void ];

export interface RemoteDataOpts {
  apiEndpoint: string;
  opts?: Record<string, any>;
}

export interface RemoteMetadata {
  error?: string;
  total?: number;
}

export interface RemoteResource<Payload, CreateShape = Partial<Payload>, DeleteShape = void, UpdateShape = Payload> {
  busy?: boolean;
  data?: Payload;
  doCreate: (arg0: CreateShape) => Promise<Payload>;
  doDelete: (arg0: DeleteShape) => void;
  doUpdate: (arg0: UpdateShape) => Promise<Payload>;
  error?: string;
  metadata?: RemoteMetadata;
}

export interface RemoteCollection<Payload, CreateShape = Partial<Payload>, DeleteShape = Id, UpdateShape = Payload> {
  data?: Payload[];
  doCreate: (arg0: CreateShape) => Promise<Payload[]>;
  doDelete: (arg0: Id) => void;
  doUpdate: (arg0: Id, arg1: UpdateShape) => Promise<Payload[]>;
  error?: string;
  metadata?: RemoteMetadata;
}

export type RemoteCollectionOpts = RemoteDataOpts;

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

export interface Session {
  name: string;
}

export interface AnalyticsEvent {
  eventType: string;
  eventData?: string; /* serialized JSON */
}
