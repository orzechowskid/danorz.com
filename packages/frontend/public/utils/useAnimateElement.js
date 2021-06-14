import {
  useEffect
} from 'preact/hooks';

/** @typedef {Object} AnimateElementOptions
 * @property {string} [className="animate"]
 * @property {number} [delay=0]
 * @property {number} duration
 * @property {() => void} [onEnd]
 * @property {() => void} [onStart]
 * @property {{ current: HTMLElement }} ref
 */

/** @param {AnimateElementOptions} opts */
function useAnimateElement(opts) {
  const {
    className,
    delay = 0,
    duration = 0,
    onEnd,
    onStart,
    ref
  } = opts;

  useEffect(function onMount() {
    if (!ref.current) {
      return;
    }

    setTimeout(function() {
      ref.current.classList.add(`${className}-start`);
      onStart?.();

      setTimeout(function() {
        ref.current.classList.add(`${className}-end`);
        onEnd?.();
      }, duration);
    }, delay);
  }, [ delay, duration, onStart, onEnd, ref.current ]);
}

export {
  useAnimateElement
};
