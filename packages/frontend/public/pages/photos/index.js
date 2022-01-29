import {
  useCallback,
  useRef
} from 'preact/hooks';

import Busy from '~/components/Busy.js';
import Input from '~/components/Input.js';
import {
  getFormData
} from '~/utils/helpers.js';
import {
  useRemoteCollection
} from '~/utils/useRemoteData.js';

import layoutStyles from '~/components/Layout.module.css';

const usePhotos = () => {
  /** @type {import('~/t').RemoteCollection<import('dto').PhotoGallery>} */
  const {
    busy,
    data,
    post
  } = useRemoteCollection(`media/galleries`);
  /** @type {import('preact/hooks').MutableRef<HTMLFormElement|null>} */
  const formRef = useRef(null);
  const onCreateNewGallery = useCallback(
    /** @type {import('~/t').EventHandler<HTMLFormElement>} */
    async function onCreateNewGallery(e) {
      if (!formRef.current) {
        return;
      }

      const formData = getFormData(formRef.current);

      e.preventDefault();
      post(formData);
    },
    []
  );

  return {
    data,
    formRef,
    onCreateNewGallery
  };
};

/** @type {import('~/t').Component<{}>} */
const Photos = () => {
  const {
    data,
    formRef,
    onCreateNewGallery
  } = usePhotos();

  return (
    <Busy
      asTag="div"
      className={layoutStyles.layout}
      ready
    >
      <ul>
        {data?.map((gallery) => (
          <li key={gallery._id}>
            <a href={`/photos/gallery/${gallery._id}`}>{gallery.name}</a>
          </li>
        ))}
      </ul>
      <form
        onSubmit={onCreateNewGallery}
        ref={formRef}
      >
        <Input type="text" name="name" />
        <button type="submit">do it</button>
      </form>
    </Busy>
  );
};

export default Photos;
