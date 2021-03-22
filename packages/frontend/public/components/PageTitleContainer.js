import styles from './PageTitleContainer.module.css';

function PageTitle(props) {
  const {
    children
  } = props;

  return (
    <h2>{children}</h2>
  );
}

function PageActions(props) {
  const {
    children
  } = props;

  return (
    <div>
      {children}
    </div>
  );
}

/** @type {types.Component<>} */
function PageTitleContainer(props) {
  const {
    children
  } = props;

  return (
    <div className={styles.pageTitleContainer}>
      {children}
    </div>
  );
}

export {
  PageActions,
  PageTitle
};

export default PageTitleContainer;
