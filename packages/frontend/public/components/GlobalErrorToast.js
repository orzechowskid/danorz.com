import {
  useGlobalErrorToast
} from '~/utils/useGlobalErrorToast.js';

import styles from './GlobalErrorToast.module.css';

/** @type {import('~/t').Component<{}>} */
const GlobalErrorToast = () => {
  const {
    messages
  } = useGlobalErrorToast();

  return (
    <div>
      <div
        class={styles.toaster}
      >
      </div>
      <div
        class="at-only"
        role="log"
      >
        {messages?.map(
          (msg) => <span key={msg}>{msg}</span>
        )}
      </div>
    </div>
  );
};

export default GlobalErrorToast;
