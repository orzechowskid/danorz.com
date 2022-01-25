import styles from './Busy.module.css';

/**
 * @typedef {'div'|'main'|'section'|'span'} ElTags
 *
 * @typedef BusyContainerSelfProps
 * @property {ElTags|import('~/t').Component<any>} [asTag]
 * @property {boolean} ready
 *
 * @typedef {BusyContainerSelfProps & import('~/t').HTMLAttributes} BusyContainerProps
 *
 * @typedef {Omit<BusyContainerProps, 'asTag'>} BusyContainerHelperProps
 *
 * @typedef {Record<ElTags, import('~/t').Component<BusyContainerHelperProps>>} Helpers
 */

/** @type {import('~/t').Component<BusyContainerProps>} */
const BusyContainer = function(props) {
  const {
    asTag = `div`,
    children,
    class: cls,
    ready,
    ...otherProps
  } = props;
  const ElementName = asTag;
  const classname = cls || ``;

  return (
    <ElementName
      aria-busy={!ready}
      class={`${styles.busy} ${classname}`}
      {...otherProps}
    >
      {children}
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
