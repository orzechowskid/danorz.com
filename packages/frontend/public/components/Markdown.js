import * as types from '~/types';

import MarkdownToJsx from 'markdown-to-jsx';

import styles from './Markdown.module.css';

/**
 * @typedef {Object} MarkdownProps
 * @property {string} children
 * @property {string} [className]
 */

/** @type {types.Component<MarkdownProps>} */
function Markdown(props) {
  const {
    children,
    className = ``
  } = props;
  //  const


  return (
    <MarkdownToJsx className={`${styles.markdown} ${className}`}>
      {props.children}
    </MarkdownToJsx>
  );
}

export default Markdown;
