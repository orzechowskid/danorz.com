/* this is just to make swr happy */

declare module 'react' {
  import {
    FunctionComponent
  } from 'preact';

  export type FC<T> = FunctionComponent<T>;
}
