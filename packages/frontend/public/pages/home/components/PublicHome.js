import Markdown from '~/components/Markdown.js';
import {
  useRemoteData
} from "~/utils/useRemoteData.js";

function usePublicHome() {
  const {
    data
  } = useRemoteData({
    apiEndpoint: `content/home`
  });

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
