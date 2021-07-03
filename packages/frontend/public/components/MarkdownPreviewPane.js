import {
  useCallback,
  useState
} from 'preact/hooks';

import Markdown from './Markdown.js';

/**
 * @typedef {Object} MarkdownPreviewPaneProps
 * @property {string} [className]
 * @property {(string) => void} onChange
 * @property {string} name
 * @property {boolean} previewMode
 * @property {string} value
 */

/** @param {MarkdownPreviewPaneProps} props */
function useMarkdownPreviewPane(props) {
  const {
    initialValue,
    onChange
  } = props;
  const [ value, setValue ] = useState(initialValue || ``);
  const onTextChange = useCallback(function onTextChange(e) {
    setValue(e.target.value);
    onChange?.(e);
  }, [ onChange ]);

  return {
    ...props,
    onTextChange,
    value
  };
}

/** @type {import('preact').FunctionComponent<MarkdownPreviewPaneProps>} */
const MarkdownPreviewPane = function(props) {
  const {
    className,
    name,
    onTextChange,
    previewMode,
    value
  } = useMarkdownPreviewPane(props);

  return previewMode
    ? (
      <>
        <Markdown className={className}>
          {value}
        </Markdown>
        <input
          name={name}
          type="hidden"
          value={value}
        />
      </>
    ) : (
      <textarea
        className={className}
        name={name}
        onChange={onTextChange}
      >
        {value}
      </textarea>
    );
}

export default MarkdownPreviewPane;
