const RICHPREVIEW_DELIM = `:::`;

/**
 * @param {string} input
 * @return {string}
 */
function preprocess(input) {
  // this is gross but who knows when markdown-to-jsx will allow syntax extensions
  return input.replace(new RegExp(`${RICHPREVIEW_DELIM}(.*)${RICHPREVIEW_DELIM}`), function(substring, capture) {
    return `<md-preview url="${capture}"></md-preview>`;
  });
}

export {
  preprocess
};
