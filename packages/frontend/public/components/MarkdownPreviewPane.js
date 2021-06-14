import {
  useCallback,
  useState
} from 'preact/hooks';

import Markdown from './Markdown.js';

/**
 * @typedef {Object} MarkdownPreviewPaneProps
 * @property {string} [className]
 * @property {(string) => void} onChange
 * @property {boolean} previewMode
 * @property {string} value
 */

/** @param {MarkdownPreviewPaneProps} props */
function useMarkdownPreviewPane(props) {
  const {
    className,
    initialValue,
    onChange,
    previewMode
  } = props;
  const [ value, setValue ] = useState(initialValue || ``);
  const onTextChange = useCallback(function onTextChange(e) {
    setValue(e.target.value);
    onChange?.(e.target.value);
  }, [ onChange ]);

  return {
    className,
    onTextChange,
    previewMode,
    value
  };
}

/** @type {import('preact').FunctionComponent<MarkdownPreviewPaneProps>} */
const MarkdownPreviewPane = function(props) {
  const {
    className,
    onTextChange,
    previewMode,
    value
  } = useMarkdownPreviewPane(props);

  return previewMode
    ? (
      <Markdown
        className={className}
      >
        {value}
      </Markdown>
    ) : (
      <textarea
        className={className}
        onChange={onTextChange}
      >
        {value}
      </textarea>
    );
}

export default MarkdownPreviewPane;
