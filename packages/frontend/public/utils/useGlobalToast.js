import {
  createContext
} from 'preact';
import {
  useCallback,
  useContext,
  useState
} from 'preact/hooks';

/**
 * @typedef GlobalToastContextShape
 * @property {(arg0: import('~/t').Toast) => void} toast
 * @property {import('~/t').Toast[]} messages
 */

/** @type {import('~/t').Toast[]} */
const preQueuedMessages = [];

/** @type {(arg0: import('~/t').Toast) => void} */
function queueMessage(message) {
  preQueuedMessages.push(message);
}

/** @type {import('preact').Context<GlobalToastContextShape>} */
const GlobalToastContext = createContext({
  toast: queueMessage,
  messages: preQueuedMessages
});

/** @type {import('~/t').Component<{}>} */
export const GlobalToastProvider = ({
  children
}) => {
  const [ messages, setMessages ] = useState(
    () => preQueuedMessages
  );
  const toast = useCallback(
    /** @param {import('~/t').Toast} newMessage */
    function toast(newMessage) {
      setMessages((m) => [ ...m, newMessage ]);
    }, []
  );

  return (
    <GlobalToastContext.Provider value={{
      toast, messages
    }}>
      {children}
    </GlobalToastContext.Provider>
  );
};

export const useGlobalToast = () => useContext(GlobalToastContext);
