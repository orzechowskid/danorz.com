import Busy from '~/components/Busy.js';
import Heading from '~/components/Heading.js';
import Input from '~/components/Input.js';
import Section from '~/components/Section.js';
import {
  useI18n
} from '~/utils/useI18n.js';
import {
  useSiteSettings
} from '~/utils/useSiteSettings.js';

import layoutStyles from '~/components/Layout.module.css';

/**
 * @typedef SettingsProps
 * @property {Record<string,any>} data
 * @property {string} path
 * @property {(path: string, nextValue: any) => void} updateSetting
 */

/** @type {import('~/t').Component<SettingsProps>} */
const SettingsValue = (props) => {
  const {
    data,
    path,
    updateSetting
  } = props;
  const {
    type,
    value
  } = data;
  const {
    t
  } = useI18n();

  switch (type) {
    case 'boolean': {
      /** @type {import('preact').JSX.MouseEventHandler<HTMLInputElement>} */
      function onChange(e) {
        updateSetting(path, e?.currentTarget?.checked);
      }

      return (
        <div>
          <div>
            {t(`Settings:${path}`)}
          </div>
          <label>
            <Input
              name={path}
              onChange={onChange}
              type="checkbox"
              checked={!!value}
            />
            <span>
              {t(`Settings:enabled`)}
            </span>
          </label>
        </div>
      );
    }
    case 'string': {
      function onChange(e) {
        updateSetting(path, e?.currentTarget.value);
      }

      return (
        <div>
          <label>
            <div>
              {t(`Settings:${path}`)}
            </div>
            <Input
              name={path}
              onBlur={onChange}
              type="text"
              value={value ?? ''}
            />
          </label>
        </div>
      );
    }
    default: {
      return (
        <Input
          name={path}
          type="text"
          value={value ?? ''}
        />
      );
    }
  }
};

/** @type {import('~/t').Component<SettingsProps>} */
const SettingsObject = (props) => {
  const {
    data,
    path,
    updateSetting
  } = props;
  const {
    t
  } = useI18n();

  return (
    <Section>
      {Object.entries(data).map(
        ([ k, v ]) => (
          <div key={k}>
            {'type' in v && 'value' in v ? (
              <>
                <SettingsValue
                  data={v}
                  path={path ? `${path}.${k}` : k}
                  updateSetting={updateSetting}
                />
              </>
            ) : (
              <>
                <Heading>
                  {t(path ? `Settings:${path}.${k}` : `Settings:${k}`)}
                </Heading>
                <SettingsObject
                  data={v}
                  path={path ? `${path}.${k}` : k}
                  updateSetting={updateSetting}
                />
              </>
            )}
          </div>
        )
      )}
    </Section>
  );
}

function useSettingsPage() {
  const {
    busy,
    data,
    updateSetting
  } = useSiteSettings();

  return {
    busy,
    data,
    updateSetting
  };
}

function SettingsPage() {
  const {
    busy,
    data,
    updateSetting
  } = useSettingsPage();

  if (!data) {
    return null;
  }

  return (
    <Busy
      asTag={Section}
      class={layoutStyles.layout}
      ready={!busy}
    >
      <SettingsObject
        data={data.values}
        path={''}
        updateSetting={updateSetting}
      />
    </Busy>
  );
}

export default SettingsPage;
