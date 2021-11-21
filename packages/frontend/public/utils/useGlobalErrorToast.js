import {
  createContext
} from 'preact';
import {
  useCallback,
  useContext,
  useState
} from 'preact/hooks';

/**
 * @typedef GlobalErrorToastContextShape
 * @property {(arg0: string) => void} [errorToast]
 * @property {string[]} [messages]
 */

/** @type {import('preact').Context<GlobalErrorToastContextShape>} */
const GlobalErrorToastContext = createContext({});

/** @type {import('~/t').Component<{}>} */
export const GlobalErrorToastProvider = ({ children }) => {
  const [messages, setMessages] = useState(
    /** @return {string[]} */
    () => []
  );
  const errorToast = useCallback(
    /** @param {string} newMessage */
    function errorToast(newMessage) {
      setMessages((m) => [ ...m, newMessage ]);
    }, []
  );

  return (
    <GlobalErrorToastContext.Provider value={{errorToast, messages}}>
      {children}
    </GlobalErrorToastContext.Provider>
  );
};

export const useGlobalErrorToast = () => {
  return useContext(GlobalErrorToastContext);
};
