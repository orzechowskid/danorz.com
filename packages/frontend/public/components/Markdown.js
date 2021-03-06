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

function Code(props) {
  return props.children.includes(`\n`)
    ? <pre><code {...props} /></pre>
    : <code {...props} />;
}

function Strikethrough(props) {
  return (
    <span className={styles.strikethrough}>
      {props.children}
    </span>
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
          code: Code,
          'md-preview': LinkPreview,
          strikethrough: Strikethrough
        }
      }}
    >
      {text}
    </MarkdownToJsx>
  );
}

export default Markdown;
