import MarkdownToJsx from 'markdown-to-jsx';

import LinkPreview from '~/components/LinkPreview.js';
import {
  preprocess
} from '~/utils/markdown.js';

import styles from './Markdown.module.css';

/**
 * @typedef {Object} MarkdownProps
 * @property {string} [children]
 * @property {string} [className]
 */

/**
 * @typedef {Object} LinkProps
 * @property {string} href
 */


/** @type {import('~/t').Component<LinkProps>} */
const A = (props) => {
  const {
    href
  } = props;
  const aProps = href.includes(`//`)
    ? {
      rel: `noopener noreferer`, target: `_blank`
    }
    : {};

  return (
    <a
      {...aProps}
      {...props}
      href={href}
    />
  );
}

const Code = (props) => props.children.includes(`\n`)
  ? <pre><code {...props} /></pre>
  : <code {...props} />

const Strikethrough = (props) => (
  <span className={styles.strikethrough}>
    {props.children}
  </span>
)

/** @type {import('~/t').Component<MarkdownProps>} */
const Markdown = (props) => {
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
