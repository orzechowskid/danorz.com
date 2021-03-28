import {
  useCallback,
  useState
} from 'preact/hooks';

import * as types from '~/types';

import Markdown from '~/components/Markdown.js';
import LinkButton from '~/components/LinkButton.js';
import PageTitleContainer, {
  PageActions,
  PageTitle
} from '~/components/PageTitleContainer.js';
import {
  useI18n
} from '~/utils/useI18n.js';
import {
  usePageMeta,
  usePageTitle
} from '~/utils/usePageTitle.js';
import {
  useRemoteData
} from '~/utils/useRemoteData.js';

import layoutStyles from '~/components/Layout.module.css';
import styles from './index.module.css';

function About() {
  const {
    t
  } = useI18n();
  const {
    data,
    doUpdate,
    localError,
    metadata
  } = useRemoteData({
    apiEndpoint: `content/bio`
  });
  const page = `About`;
  const pageTitle = t(`${page}:title`);
  const pageContents = data?.[0]?.text;
  const error = localError || metadata?.error;
  /** @type {types.LocalState<string>} */
  const [ previewContents, setPreviewContents ] = useState(pageContents);
  /** @type {types.LocalState<boolean>} */
  const [ editMode, setEditMode ] = useState(false);
  /** @type {types.LocalState<boolean>} */
  const [ previewMode, setPreviewMode ] = useState(false);
  const onEdit = useCallback(function onEdit() {
    setEditMode(true);
    setPreviewContents(pageContents);
  }, [ pageContents ]);
  const onPreview = useCallback(function onPreview() {
    setPreviewMode(!previewMode);
  }, [ previewMode ]);
  const onCancel = useCallback(function onCancel() {
    setEditMode(false);
    setPreviewMode(false);
  }, []);
  const onChange = useCallback(function onChange(e) {
    setPreviewContents(e.target.value);
  }, []);
  const onSubmit = useCallback(function onSubmit(e) {
    e.preventDefault();
    doUpdate({ ...data[0], text: previewContents });
    setEditMode(false);
    setPreviewMode(false);
  }, [ previewContents ]);
  const md = previewMode
       ? previewContents
    : pageContents;

  usePageTitle(function setPageTitle() {
    return pageTitle;
  }, [ pageTitle ]);
  usePageMeta(function setPageMetaTags() {
    return {
      description: t(`About:description`)
    }
  }, [ t ]);

  return (
    <div className={`${layoutStyles.layout}`}>
      <PageTitleContainer>
        <PageTitle>
          {pageTitle}
        </PageTitle>
        <PageActions>
          {editMode ? (
            <>
              <LinkButton
                key="preview"
                aria-pressed={previewMode}
                className={styles.previewButton}
                onClick={onPreview}
              >
                <span>{t(`PageActions:preview-button`)}</span>
              </LinkButton>
              <LinkButton
                key="save"
                form={page}
                type="submit"
              >
                {t(`PageActions:save-button`)}
              </LinkButton>
              <LinkButton
                key="cancel"
                onClick={onCancel}
              >
                {t(`PageActions:cancel-button`)}
              </LinkButton>
            </>
          ) : (
            <LinkButton
              key="edit"
              onClick={onEdit}
            >
              {t(`EditButton:title`)}
            </LinkButton>
          )}
        </PageActions>
      </PageTitleContainer>
      {error && <div>{error}</div>}
      {editMode ? (
        <form
          id={page}
          onSubmit={onSubmit}
        >
          {previewMode ? (
            <Markdown className={styles.markdownPreview}>{md}</Markdown>
          ) : (
            <textarea
              className={styles.editArea}
              onChange={onChange}
            >
              {previewContents}
            </textarea>
          )}
        </form>
      ) : (
        <Markdown>{md}</Markdown>
      )}
    </div>
  );
}

export default About;
