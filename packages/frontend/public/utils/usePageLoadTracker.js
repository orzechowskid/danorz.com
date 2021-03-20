import {
  useEffect,
  useRef
} from 'preact/hooks';

import {
  firePageView
} from '~/utils/analytics.js';

/**
 * @param {boolean[]} [doneConditions]
 */
function usePageLoadTracker(doneConditions = []) {
  const doneRef = useRef(false);

  useEffect(function onLoad() {
    if (doneRef.current) {
      return;
    }

    if (!doneConditions.length || doneConditions.filter(Boolean).length) {
      doneRef.current = true;

      firePageView();

      if (window.location.hash) {
        document.querySelector(window.location.hash)?.scrollIntoView();
      }
      else {
        window.scrollTo({ top: 0 });
      }
    }
  }, doneConditions);
}

export {
  usePageLoadTracker
};
