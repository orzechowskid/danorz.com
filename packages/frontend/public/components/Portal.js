import {
  createPortal
} from 'preact/compat';

/**
 * @typedef PortalProps
 * @property {null|ReturnType<typeof import('preact').createElement>} children
 * @property {string} to
 */

/** @type {import('~/t').Component<PortalProps>} */
const Portal = (props) => {
  const {
    children,
    to
  } = props;
  const el = document.querySelector(to);

  if (!el) {
    throw new Error(`invalid portal selector '${to}'`);
  }
  else if (!children) {
    return null;
  }

  return createPortal(children, el);
}

export default Portal;
