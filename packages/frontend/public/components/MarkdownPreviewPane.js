import {
  useCallback,
  useState
} from 'preact/hooks';

import Markdown from './Markdown.js';
import Textarea from './Textarea.js';

import styles from './MarkdownPreviewPane.module.css';

/**
 * @typedef MarkdownPreviewPaneProps
 * @property {string} [className]
 * @property {string} [initialValue]
 * @property {(arg0: string) => void} onChange
 * @property {string} name
 * @property {boolean} previewMode
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

/** @type {import('~/t').Component<MarkdownPreviewPaneProps>} */
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
        <Markdown class={`${className} ${styles.previewMode}`}>
          {value}
        </Markdown>
        <input
          name={name}
          type="hidden"
          value={value}
        />
      </>
    ) : (
      <Textarea
        class={className}
        name={name}
        onChange={onTextChange}
      >
        {value}
      </Textarea>
    );
}

export default MarkdownPreviewPane;
