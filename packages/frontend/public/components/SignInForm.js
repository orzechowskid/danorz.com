import * as types from '~/types.js';

import {
  useCallback,
  useState
} from 'preact/hooks';

import Input from '~/components/Input.js';
import {
  getFormData
} from '~/utils/helpers.js';
import {
  useI18n
} from '~/utils/useI18n.js';
import {
  useSession
} from '~/utils/useSession.js';

import styles from './SignInForm.module.css';

function useSignInForm() {
  const {
    signIn
  } = useSession();
  /** @type {types.LocalState<boolean>} */
  const [ isBusy, setBusy ] = useState(false);
  /** @type {types.LocalState<number>} */
  const [ focusedEls, setFocusedEls ] = useState(0);
  /** @type {(e: SubmitEvent) => void} */
  const onSignIn = useCallback(async function onSignIn(e) {
    const {
      password,
      username
    } = getFormData(e.target);

    e.preventDefault();
    setBusy(true);
    await signIn({
      name: username,
      password
    });
    setBusy(false);
  }, []);
  const increment = useCallback(function increment() {
    setFocusedEls((f) => f + 1);
  }, []);
  const decrement = useCallback(function decrement() {
    setFocusedEls((f) => f - 1);
  }, []);

  return {
    decrement,
    focusedEls,
    increment,
    isBusy,
    onSignIn
  };
}

function SignInForm() {
  const {
    decrement,
    focusedEls,
    increment,
    isBusy,
    onSignIn
  } = useSignInForm();
  const {
    t
  } = useI18n();

  return (
    <form
      className={styles.signInForm}
      data-active={focusedEls > 0 || undefined}
      onSubmit={onSignIn}
    >
      <label>
        <span>{t(`SignInForm:username`)}</span>
        <Input
          name="username"
          onBlur={decrement}
          onFocus={increment}
          placeholder={t(`SignInForm:username-placeholder`)}
          required
          type="text"
        />
      </label>
      <label>
        <span>{t(`SignInForm:password`)}</span>
        <Input
          name="password"
          onBlur={decrement}
          onFocus={increment}
          required
          type="password"
        />
      </label>
      <button
        disabled={isBusy || undefined}
        onBlur={decrement}
        onFocus={increment}
        type="submit"
      >
        <span aria-live="polite">
          {t(isBusy ? `SignInForm:please-wait` : `SignInForm:sign-in`)}
        </span>
      </button>
    </form>
  );
}

export default SignInForm;
