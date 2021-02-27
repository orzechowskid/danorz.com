import * as types from '~/types';

import MarkdownToJsx from 'markdown-to-jsx';

import styles from './Markdown.module.css';

function A(props) {
  return (
    <a
      rel="noopener noreferer"
      target="_blank"
      {...props}
    />
  );
}

/**
 * @typedef {Object} MarkdownProps
 * @property {string} children
 * @property {string} [className]
 */

/** @type {types.Component<MarkdownProps>} */
function Markdown(props) {
  const {
    children = ``,
    className = ``
  } = props;
  //  const

  return (
    <MarkdownToJsx
      className={`${styles.markdown} ${className}`}
      options={{
        overrides: {
          a: A
        }
      }}
    >
      {children}
    </MarkdownToJsx>
  );
}

export default Markdown;
