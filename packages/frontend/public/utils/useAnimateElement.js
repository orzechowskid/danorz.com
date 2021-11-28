import {
  useEffect
} from 'preact/hooks';

/**
 * @typedef AnimateElementOptions
 * @property {string} className
 * @property {number} [delay]
 * @property {number} [duration]
 * @property {() => void} [onEnded]
 * @property {() => void} [onStarted]
 * @property {import('preact/hooks').Ref<HTMLElement>} ref
 */

/**
 * @param {AnimateElementOptions} opts
 */
function useAnimateElement(opts) {
  const {
    className,
    delay = 0,
    duration = 0,
    onEnded,
    onStarted,
    ref
  } = opts;

  useEffect(function onMount() {
    if (!ref.current) {
      return;
    }

    /** @type {ReturnType<typeof setTimeout>} */
    let endTimer;
    const startTimer = setTimeout(function() {
      ref.current.classList.add(className, `${className}-start`);
      onStarted?.();

      endTimer = setTimeout(function() {
        ref.current.classList.add(className, `${className}-end`);
        onEnded?.();
      }, duration);
    }, delay);

    return function cleanup() {
      clearTimeout(startTimer);
      clearTimeout(endTimer);
    }
  }, [ delay, duration, onStarted, onEnded ]);
}

export {
  useAnimateElement
};
