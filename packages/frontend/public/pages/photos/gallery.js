import {
  useCallback
} from 'preact/hooks';
import {
  useLocation
} from 'preact-iso';

import Busy from '~/components/Busy.js';
import Heading from '~/components/Heading.js';
import Input from '~/components/Input.js';
import {
  usePageLoadTracker
} from '~/utils/usePageLoadTracker.js';
import {
  useRemoteObject
} from '~/utils/useRemoteData.js';

/**
 * @typedef GalleryProps
 * @property {import('dto').Id} id
 */

const styles = {};

/**
 * @param {GalleryProps} props
 */
function useGallery(props) {
  const {
    path
  } = useLocation();
  const id = path?.split(`/`).pop();
  /** @type {import('~/t').RemoteObject<import('dto').PhotoGallery, FormData>} */
  const {
    busy,
    data,
    post
  } = useRemoteObject(`media/galleries/${id}`, {
    postOpts: {
      headers: {
      },
      noCache: true,
      raw: true
    }
  });
  const onUpload = useCallback(
    /** @type {(e: SubmitEvent) => Promise<void>} */
    async function onUpload(e) {
      e.preventDefault();
      const formData = new FormData(document.querySelector('form'));

      post(formData);
    },
    [ post ]
  );
  usePageLoadTracker([ !busy ]);

  return {
    busy,
    data,
    onUpload
  };
}

/** @type {import('~/t').Component<GalleryProps>} */
const Gallery = (props) => {
  const {
    busy,
    data,
    onUpload
  } = useGallery(props);

  return (
    <Busy ready={!busy}>
      <Heading>{data?.name}</Heading>
      {data?.items.map((item) => (
        <a
          key={item.path}
          data-native={true}
          href={`${window.location.origin}${item.path}`}
        >
          <img
            className={styles.thumbnail}
            src={item.thumbnailPath}
          />
        </a>
      ))}
      <form
        encType="multipart/form-data"
        onSubmit={onUpload}
      >
        <Input type="file" name="file" multiple />
        <button type="submit">do it</button>
      </form>
    </Busy>
  );
};

export default Gallery;
