import styles from './Busy.module.css';

/**
 * @typedef {'div'|'main'|'section'|'span'} Els
 *
 * @typedef BusyContainerSelfProps
 * @property {Els} [as]
 * @property {boolean} ready;
 *
 * @typedef {BusyContainerSelfProps & import('preact').JSX.HTMLAttributes} BusyContainerProps
 *
 * @typedef {Record<Els, import('~/t').Component<BusyContainerProps>>} Helpers
 *
 * @typedef {Helpers & import('~/t').Component<BusyContainerProps>} AugmentedComponent
 */

/** @type {import('~/t').Component<BusyContainerProps>} */
const BusyContainer = function(props) {
  const {
    as: ElementName = `div`,
    children,
    class: cls = ``,
    ready,
    ...otherProps
  } = props;

  return (
    <ElementName
      aria-busy={!ready}
      class={`${styles.busy} ${cls}`}
      {...otherProps}
    >
      {children}
    </ElementName>
  );
};

/**
 * @param {import('~/t').Component<BusyContainerSelfProps>} Fn
 * @return {AugmentedComponent}
 */
export function factory(Fn) {
  /** @type {Record<Els, import('~/t').Component<BusyContainerProps>>} */
  const augments = {
    div: (props) => <Fn {...props} as="div" />,
    main: (props) => <Fn {...props} as="main" />,
    section: (props) => <Fn {...props} as="section" />,
    span: (props) => <Fn {...props} as="span" />
  };

  return Object.assign(Fn, augments);
}

export default factory(BusyContainer);
