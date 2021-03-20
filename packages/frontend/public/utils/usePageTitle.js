import {
  useEffect
} from 'preact/hooks';

/**
 * @param {() => string} pageTitleFn
 * @param {Object[]} [deps]
 */
function usePageTitle(pageTitleFn, deps = []) {
  useEffect(function setPageTitle() {
    if (pageTitleFn) {
      document.title = pageTitleFn();
    }
  }, deps);
}

/**
 * @param {() => Object.<string,string>} pageMetadataFn
 * @param {Object[]} [deps]
 */
function usePageMeta(pageMetadataFn, deps = []) {
  useEffect(function setPageMeta() {
    const pageMetadata = pageMetadataFn();
    // console.log(envData);

    // TODO: there are probably some pre-canned meta tags which should be present on
    // all pages

    Object.entries(pageMetadata).forEach(function setMetaTag([ k, v ]) {
      let node = document.querySelector(`meta[name="${k}"]`)

      if (!node) {
        node = document.createElement(`meta`);

        node.setAttribute(`name`, k);
        document.head.appendChild(node);
      }

      node.setAttribute(`content`, v);
    });

    return function cleanup() {
      Object.entries(pageMetadata).forEach(function removeMetaTag([ k ]) {
        document.querySelector(`meta[name=${k}]`)?.remove();
      });
    };
  }, deps);
}

export {
  usePageMeta,
  usePageTitle
};
