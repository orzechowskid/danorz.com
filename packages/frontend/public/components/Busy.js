import * as types from '~/types';

import {
  useEffect,
  useRef
} from 'preact/hooks';

import styles from './Busy.module.css';

/**
 * @typedef {Object} BusyProps
 * @property {string} [className]
 * @property {string} [size]
 * @property {string} [thiccness]
 */

/** @type {types.Component<BusyProps>} */
function Busy(props) {
  const {
    className = ``,
    size = `4em`,
    thiccness = `0.3em`
  } = props;
  const wrapperRef = useRef();

  useEffect(function setSpinnerStyle() {
    wrapperRef.current.style.setProperty(`--width-busy-indicator`, thiccness);
    wrapperRef.current.style.setProperty(`--size-busy-indicator-container`, size);
  }, []);

  return (
    <div
      ref={wrapperRef}
      className={`${styles.wrapper} ${className}`}
      style={{ height: size, width: size }}
    >
      <div className={styles.loader} />
    </div>
  );
}

export default Busy;
