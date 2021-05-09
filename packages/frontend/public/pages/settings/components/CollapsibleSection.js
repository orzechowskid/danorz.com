import {
  useI18n
} from '~/utils/useI18n.js';

import styles from './CollapsibleSection.module.css';

/**
 * @typedef {Object} CollapsibleSectionProps
 * @property {Object} data
 * @property {number} level
 * @property {string} namespace
 */

function CollapsibleSection(props) {
  const {
    data,
    level,
    namespace
  } = props;
  const {
    t
  } = useI18n();
  /* +1 for site title, + 1 for page title */
  const headerElLevel = level + 2;
  const keys = Object.keys(data);//.sort(sortSettingsKeys);
  const El = `h${headerElLevel}`;

  return (
    <section className={styles.collapsibleSection}>
      <El>{t(`Settings:${namespace}`)}</El>

      <div>
        {keys.map((k) => (
          data[k] instanceof Object
            ? (
              <CollapsibleSection
                key={k}
                data={data[k]}
                level={level + 1}
                namespace={`${namespace}.${k}`}
              />
            ) : (
              <div key={k}>
                {t(`Settings:${namespace}.${k}`)}
              </div>
            )
        ))}
      </div>
    </section>
  );
}

export default CollapsibleSection;

