import preact from 'preact';

import Busy from '~/components/Busy.js';
import PageTitle from '~/components/PageTitle.js';

import layoutStyles from '~/components/Layout.module.css';

/**
 * @typedef PageSelfProps
 * @property {boolean} [ready]
 * @property {string} title
 *
 * @typedef {PageSelfProps & import('preact').JSX.HTMLAttributes<HTMLElement>} PageProps
 */

/** @type {import('~/t').Component<PageProps>} */
const Page = (props) => {
  const {
    children,
    class: cls,
    ready,
    title,
    ...otherProps
  } = props;

  return (
    <Busy.div
      class={`${layoutStyles.layout} ${cls}`}
      ready={!!ready}
      {...otherProps}
    >
      <PageTitle>
        {title}
      </PageTitle>

      {children}
    </Busy.div>
  );
}

export default Page;
