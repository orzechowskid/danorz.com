import * as types from '~/types';

import {
  useEffect,
  useRef
} from 'preact/hooks';
import {
  createPortal
} from 'preact/compat';

/**
 * @typedef {Object} ModalDialogProps
 * @property {types.Component[]} children
 */

/** @type {types.Component<ModalDialogProps>} */
function ModalDialog(props) {
  const {
    children
  } = props;
  /** @type {types.PreactRef<HTMLDialogElement>} */
  const dialogElRef = useRef(document.getElementById(`modal-dialog`));

  useEffect(function setIsOpen() {
    dialogElRef.current.setAttribute(`open`, ``);

    return function cleanup() {
      dialogElRef.current.removeAttribute(`open`);
    };
  }, [])

  return (
    createPortal([].concat(children)[0], dialogElRef.current)
  );
}

export default ModalDialog;
