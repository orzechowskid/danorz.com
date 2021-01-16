import Markdown from 'markdown-to-jsx';

import * as types from '../types';

/** @type {types.Component<types.BlogPost>} */
function FeedItem(props) {
  const {
    tags = [],
    text,
    title
  } = props;

  return (
    <article>
      <header>
        <h1>{title}</h1>
      </header>

      <div>
        <Markdown>
          {text}
        </Markdown>
      </div>

      <footer>
        {tags.join(',')}
      </footer>
    </article>
  );
}

export default FeedItem;
