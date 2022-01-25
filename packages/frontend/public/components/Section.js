import {
  useDocumentLevel
} from '~/utils/useDocumentLevel.js';

/**
 * @typedef SectionSelfProps
 * @property {'article'|'aside'|'nav'|'section'} [as]
 *
 * @typedef {SectionSelfProps & Omit<import('~/t').HTMLAttributes, 'as'>} SectionProps
 */

/** @type {import('~/t').Component<SectionProps>} */
const Section = (props) => {
  const {
    as: ElementName = `section`,
    ...otherProps
  } = props;
  const {
    Provider,
    level
  } = useDocumentLevel();

  return (
    <Provider value={level + 1}>
      <ElementName {...otherProps} />
    </Provider>
  );
}

export default Section;
