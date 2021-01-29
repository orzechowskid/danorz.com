import {
  useEffect
} from 'preact/hooks';

/**
 * @param {() => string} pageTitleFn
 */
function usePageTitle(pageTitleFn) {
  useEffect(function() {
    if (pageTitleFn) {
      document.title = pageTitleFn();
    }
  }, []);
}

export default usePageTitle;
