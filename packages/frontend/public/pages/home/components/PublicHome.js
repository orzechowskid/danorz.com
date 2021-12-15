import Markdown from '~/components/Markdown.js';
import {
  useRemoteObject
} from "~/utils/useRemoteData.js";

function usePublicHome() {
  const {
    data
  } = useRemoteObject(`content/home`);

  return {
    data
  };
}

const PublicHome = () => {
  const {
    data
  } = usePublicHome();

  return (
    <Markdown>
      {data?.text}
    </Markdown>
  );
};

export default PublicHome;
