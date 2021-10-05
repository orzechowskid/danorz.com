import {
  useEffect
} from 'preact/hooks';

/** @param {import('~/t').UseAnimateElementOptions} opts */
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

    const timer = setTimeout(function() {
      ref.current.classList.add(className, `${className}-start`);
      onStart?.();

      setTimeout(function() {
        ref.current.classList.add(className, `${className}-end`);
        onEnd?.();
      }, duration);
    }, delay);

    return function cleanup() {
      clearTimeout(timer);
    }
  }, [ delay, duration, onStart, onEnd, ref.current ]);
}

export {
  useAnimateElement
};
