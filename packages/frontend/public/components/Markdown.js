import MarkdownToJsx from 'markdown-to-jsx';

import * as types from '~/types.js';

import LinkPreview from '~/components/LinkPreview.js';
import {
  preprocess
} from '~/utils/markdown.js';

import styles from './Markdown.module.css';

/**
 * @typedef {Object} MarkdownProps
 * @property {string} children
 * @property {string} [className]
 */

function A(props) {
  return (
    <a
      rel="noopener noreferer"
      target="_blank"
      {...props}
    />
  );
}

/** @type {types.Component<MarkdownProps>} */
function Markdown(props) {
  const {
    children = ``,
    className = ``
  } = props;
  const text = preprocess(children);

  return (
    <MarkdownToJsx
      className={`${styles.markdown} ${className}`}
      options={{
        overrides: {
          a: A,
          'md-preview': LinkPreview
        }
      }}
    >
      {text}
    </MarkdownToJsx>
  );
}

export default Markdown;
