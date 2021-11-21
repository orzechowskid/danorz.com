import {
  DtoWrapper,
  Id,
  Indexed
} from 'dto';
import {
  FunctionComponent,
  JSX
} from 'preact';
import * as PreactHooks from 'preact/hooks';
import { SWRConfiguration, SWRResponse } from 'swr';

export type Component<Props = {}> = FunctionComponent<JSX.HTMLAttributes & Props>;

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

export type SWR<Payload> = SWRResponse<DtoWrapper<Payload>, (string|Error)>;

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

export type HTMLAttributes<E extends EventTarget = HTMLElement> = JSX.HTMLAttributes<E>;
