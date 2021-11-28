import {
  createContext
} from 'preact';
import {
  useContext
} from 'preact/hooks';

/** @type {import('preact').Context<number>} */
const DocumentLevelContext = createContext(1);
const DocumentLevelProvider = DocumentLevelContext.Provider;

const useDocumentLevel = () => ({
  level: useContext(DocumentLevelContext),
  Provider: DocumentLevelProvider
});

export {
  DocumentLevelProvider,
  useDocumentLevel
};
