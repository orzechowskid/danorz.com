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
 */

/** @type {import('~/t').Component<BusyContainerProps>} */
const BusyContainer = function(props) {
  const {
    as = `div`,
    children,
    class: cls,
    ready,
    ...otherProps
  } = props;
  const ElementName = as;
  const classname = cls || ``;

  return (
    <ElementName
      aria-busy={!ready}
      class={`${styles.busy} ${classname}`}
      {...otherProps}
    >
      {ready ? children : null}
    </ElementName>
  );
};

/** @type {Helpers} */
const augments = {
  div: (props) => <BusyContainer {...props} as="div" />,
  main: (props) => <BusyContainer {...props} as="main" />,
  section: (props) => <BusyContainer {...props} as="section" />,
  span: (props) => <BusyContainer {...props} as="span" />
};

export default Object.assign(BusyContainer, augments);
