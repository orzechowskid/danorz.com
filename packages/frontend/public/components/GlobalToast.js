import {
  useEffect,
  useRef,
  useState
} from 'preact/hooks';

import {
  useAnimateElement
} from '~/utils/useAnimateElement.js';
import {
  useGlobalToast
} from '~/utils/useGlobalToast.js';

import styles from './GlobalToast.module.css';

/**
 * @typedef SliceProps
 * @property {string} message
 * @property {import('~/t').Toast['severity']} severity
 */

const DURATION = 5000; /* ms */

/** @type {import('~/t').Component<SliceProps>} */
const Slice = (props) => {
  const {
    message,
    severity
  } = props;
  const elRef = useRef();

  useAnimateElement({
    className: `animated-slice`,
    duration: DURATION,
    ref: elRef
  });

  return (
    <div
      ref={elRef}
      class={styles.slice}
      data-severity={severity}
    >
      {message}
    </div>
  );
}

/** @type {import('~/t').Component<{}>} */
const GlobalToast = () => {
  const {
    messages
  } = useGlobalToast();
  const [ localMessages, setLocalMessages ] = useState(
    () => messages
  );

  useEffect(function push() {
    if (!messages.length) {
      return;
    }

    setLocalMessages(function pushAndSchedule(currentMessages) {
      const delta = messages.length - currentMessages.length;

      setTimeout(function pop() {
        setLocalMessages((currentMessages) => currentMessages.slice(delta));
      }, DURATION + 1000); /* give the opacity animation time to finish */

      return [
        ...currentMessages,
        ...messages.slice(-delta)
      ];
    });
  }, [ messages ]);

  return (
    <div>
      <div
        class={styles.toaster}
        role="presentation"
      >
        {localMessages.map(
          (msg) => <Slice key={msg.message} {...msg} />
        )}
      </div>
      <div
        at-only
        role="log"
      >
        {messages?.map(
          (msg) => <span key={msg.message}>{msg.message}</span>
        )}
      </div>
    </div>
  );
};

export default GlobalToast;
