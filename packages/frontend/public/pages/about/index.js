import {
  useCallback,
  useState
} from 'preact/hooks';

import Markdown from '~/components/Markdown.js';
import LinkButton from '~/components/LinkButton.js';
import Section from '~/components/Section.js';
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
  useRemoteObject
} from '~/utils/useRemoteData.js';

import busyStyles from '~/components/Busy.module.css';
import layoutStyles from '~/components/Layout.module.css';
import styles from './index.module.css';

/**
 * @typedef {Object} AboutDocument
 * @property {string} text
 */

function useAboutPage() {
  /** @type {import('~/t').RemoteObject<AboutDocument>} */
  const {
    busy,
    data,
    post,
    put
  } = useRemoteObject(`content/bio`);
  const pageContents = data?.text;
  const [ previewContents, setPreviewContents ] = useState(pageContents);
  const [ editMode, setEditMode ] = useState(false);
  const [ editPreviewMode, setEditPreviewMode ] = useState(false);
  const {
    t
  } = useI18n();
  const onEdit = useCallback(function onEdit() {
    setEditMode(true);
    setPreviewContents(pageContents);
    setTimeout(function() {
      // TODO: something else here?  setTimeout + querySelector is kinda gross
      document?.querySelector(`textarea`).focus();
    }, 0);
  }, [ pageContents ]);
  const onPreview = useCallback(function onPreview() {
    setEditPreviewMode(!editPreviewMode);
  }, [ editPreviewMode ]);
  const onCancel = useCallback(function onCancel() {
    setEditMode(false);
    setEditPreviewMode(false);
    setPreviewContents(pageContents);
  }, []);
  const onChange = useCallback(function onChange(e) {
    setPreviewContents(e.target.value);
  }, []);
  const onSubmit = useCallback(function onSubmit(e) {
    e.preventDefault();

    if (pageContents) {
      put({
        ...data,
        text: previewContents
      });
    }
    else {
      post({
        text: previewContents
      });
    }
    setEditMode(false);
    setEditPreviewMode(false);
  }, [ previewContents ]);
  const content = editMode
    ? previewContents
    : pageContents;

  usePageMeta(function setPageMetaTags() {
    return {
      description: t(`About:description`)
    }
  }, [ t ]);

  return {
    busy,
    content,
    editMode,
    editPreviewMode,
    onCancel,
    onChange,
    onEdit,
    onPreview,
    onSubmit,
    t
  };
}

function About() {
  const {
    busy,
    content,
    editMode,
    editPreviewMode,
    onCancel,
    onChange,
    onEdit,
    onPreview,
    onSubmit,
    t
  } = useAboutPage();
  const page = `About`;
  const pageTitle = t(`${page}:title`);

  return (
    <Section className={layoutStyles.layout}>
      <PageTitleContainer>
        <PageTitle title={pageTitle} />
        <PageActions>
          {editMode ? (
            <>
              <LinkButton
                key="preview"
                aria-pressed={editPreviewMode}
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
      {editMode ? (
        <form
          id={page}
          onSubmit={onSubmit}
        >
          {editPreviewMode ? (
            <Markdown className={styles.markdownPreview}>{content}</Markdown>
          ) : (
            <textarea
              className={styles.editArea}
              onChange={onChange}
            >
              {content}
            </textarea>
          )}
        </form>
      ) : (
        <Markdown
          aria-busy={busy}
          className={busyStyles.busy}
        >
          {busy ? `` : (content || t(`About:no-content`))}
        </Markdown>
      )}
    </Section>
  );
}

export default About;
