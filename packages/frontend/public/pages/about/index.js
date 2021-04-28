import {
  useCallback,
  useState
} from 'preact/hooks';

import * as types from '~/types.js';

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
  usePageMeta
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
    doCreate,
    doUpdate,
    error,
    metadata
  } = useRemoteData({
    apiEndpoint: `content/bio`
  });
  const page = `About`;
  const pageTitle = t(`${page}:title`);
  const pageContents = data[0]?.text;
  const err = error || metadata.error;
  /** @type {types.LocalState<string>} */
  const [ previewContents, setPreviewContents ] = useState(pageContents);
  /** @type {types.LocalState<boolean>} */
  const [ editMode, setEditMode ] = useState(false);
  /** @type {types.LocalState<boolean>} */
  const [ previewMode, setPreviewMode ] = useState(false);
  const onEdit = useCallback(function onEdit() {
    setEditMode(true);
    setPreviewContents(pageContents);
    setTimeout(function() {
      // TODO: something else here?  setTimeout + querySelector is kinda gross
      document.querySelector(`textarea`).focus();
    }, 0);
  }, [ pageContents ]);
  const onPreview = useCallback(function onPreview() {
    setPreviewMode(!previewMode);
  }, [ previewMode ]);
  const onCancel = useCallback(function onCancel() {
    setEditMode(false);
    setPreviewMode(false);
    setPreviewContents(pageContents);
  }, []);
  const onChange = useCallback(function onChange(e) {
    setPreviewContents(e.target.value);
  }, []);
  const onSubmit = useCallback(function onSubmit(e) {
    e.preventDefault();
    if (pageContents) {
      doUpdate({...data[0], text: previewContents });
    }
    else {
      doCreate({ name: `bio`, text: previewContents });
    }
    setEditMode(false);
    setPreviewMode(false);
  }, [ previewContents ]);
  const md = previewMode
    ? previewContents
    : pageContents;

  usePageMeta(function setPageMetaTags() {
    return {
      description: t(`About:description`)
    }
  }, [ t ]);

  return (
    <div className={`${layoutStyles.layout}`}>
      <PageTitleContainer>
        <PageTitle title={pageTitle} />
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
      {err && <div>{err}</div>}
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
        <Markdown>{md || t(`About:no-content`)}</Markdown>
      )}
    </div>
  );
}

export default About;
