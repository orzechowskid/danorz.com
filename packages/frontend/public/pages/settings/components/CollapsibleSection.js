import * as types from '~/types.js';

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

/** @type {types.Component<CollapsibleSectionProps>} */
function CollapsibleSection(props) {
  const {
    data,
    level,
    namespace
  } = props;
  const {
    t
  } = useI18n();
  const keys = Object.keys(data);//.sort(sortSettingsKeys);
  const El = `h${level}`;

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

