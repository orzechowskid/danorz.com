import {
  useDocumentLevel
} from '~/utils/useDocumentLevel.js';

/** @type {import('~/t').Component<import('~/t').HTMLAttributes>} */
const Heading = (props) => {
  const {
    level
  } = useDocumentLevel();
  const El = `h${level}`;

  return (
    <El {...props} />
  );
};

export default Heading;
