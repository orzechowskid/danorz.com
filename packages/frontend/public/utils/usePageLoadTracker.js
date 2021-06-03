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

    if (doneConditions.every(Boolean)) {
      doneRef.current = true;

      firePageView();

      // TODO: move this somewhere else so we're not mixing concerns
      if (window.location.hash) {
        document.querySelector(window.location.hash)?.scrollIntoView();
      }
      else {
        window.scrollTo({ top: 0 });
      }
    }
  }, [ ...doneConditions, doneRef.current ]);
}

export {
  usePageLoadTracker
};
