import PageTitleContainer, {
  PageTitle
} from '~/components/PageTitleContainer.js';
import {
  useI18n
} from '~/utils/useI18n.js';
import {
  useSiteSettings
} from '~/utils/useSiteSettings.js';

import CollapsibleSection from './components/CollapsibleSection.js';

import busyStyles from '~/components/Busy.module.css';
import layoutStyles from '~/components/Layout.module.css';

function useSettings() {
  const {
    data
  } = useSiteSettings({
    raw: true
  });

  return {
    data
  };
}

/** @type {types.Component<void>} */
function Settings() {
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
    <div
      aria-busy={!ready}
      className={`${layoutStyles.layout} ${busyStyles.busy}`}
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
    </div>
  );
}

export default Settings;
