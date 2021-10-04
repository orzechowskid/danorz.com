declare module 'react' {
  interface ExoticComponent<P = {}> {
    (props: P): (any | null);
    readonly $$typeof: symbol;
  }

  interface NamedExoticComponent<P = {}> extends ExoticComponent<P> {
    displayName?: string | undefined;
  }

  interface ProviderExoticComponent<P> extends ExoticComponent<P> {
    propTypes?: undefined;
  }

  interface ProviderProps<T> {
    value: T;
    children?: undefined;
  }
}
