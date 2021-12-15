import {
  Indexed
} from 'dto';
import {
  FunctionComponent,
  JSX
} from 'preact';
import {
  StateUpdater,
} from 'preact/hooks';

export type Component<Props = {}> = FunctionComponent<JSX.HTMLAttributes & Props>;

export interface RemoteObject<T> {
  busy: boolean;
  data?: T;
  del: () => Promise<void>;
  get: () => Promise<void>;
  post: (payload: Partial<T>) => Promise<void>;
  put: (data: T) => Promise<void>;
}

export interface RemoteCollection<T, CreateShape = Partial<T>, DeleteShape = Indexed<T>, UpdateShape = Indexed<T>> {
  busy: boolean;
  data?: Indexed<T>[];
  del: (what: DeleteShape) => Promise<void>;
  get: () => Promise<void>;
  post: (what: CreateShape) => Promise<void>;
  put: (what: UpdateShape) => Promise<void>;
}

export type LocalState<T> = [T, StateUpdater<T>]


export interface AnalyticsEvent {
  eventType: string;
  eventData?: string; /* serialized JSON */
}

export type HTMLAttributes<E extends EventTarget = HTMLElement> = JSX.HTMLAttributes<E>;

export interface Toast {
  message: string;
  severity: 'log'|'info'|'warn'|'error'|'fatal';
}
