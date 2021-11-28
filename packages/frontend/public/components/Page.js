import {
  ErrorBoundary
} from 'preact-iso';

function Page(props) {
  const {
    children
  } = props;

  return (<>{children}</>);
}

export default Page;
