import PageTitleContainer, {
  PageTitle
} from '~/components/PageTitleContainer.js';
import {
  useI18n
} from '~/utils/useI18n.js';
import {
  useSiteSettings
} from '~/utils/useSiteSettings.js';

import Busy from '~/components/Busy.js';
import CollapsibleSection from './components/CollapsibleSection.js';

import layoutStyles from '~/components/Layout.module.css';

function useSettings() {
  const {
    data
  } = useSiteSettings({
    raw: true
  });

  return {
    data: data.values
  };
}

/** @type {import('~/t').Component<void>} */
const Settings = () => {
  const {
    data
  } = useSettings();
  const {
    t
  } = useI18n();
  const ready = !!data;
  const page = `Settings`;
  const pageTitle = t(`${page}:title`);

  return (
    <Busy
      ready={ready}
      className={layoutStyles.layout}
    >
      <PageTitleContainer>
        <PageTitle title={pageTitle} />
      </PageTitleContainer>

      {Object.keys(data).map((k) => (
        <CollapsibleSection
          key={k}
          data={data[k]}
          level={1}
          namespace={k}
        />
      ))}
    </Busy>
  );
}

export default Settings;
