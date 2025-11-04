import { Helmet } from 'react-helmet-async';
import { FormEvent, useRef, useState } from 'react';
import isEmail from 'validator/lib/isEmail';
import { toast } from 'react-toastify';

import Footer from '../../components/footer/footer';
import Logo from '../../components/logo/logo';
import { useAppDispatch } from '../../hooks';
import { loginAction } from '../../store/api-actions';
import { INVALID_LOGIN_MESSAGE, INVALID_PASSWORD_MESSAGE, VALID_PASSWORD_REGEX } from '../../const';

const AuthScreen = (): JSX.Element => {
  const [isInvalidLogin, setIsInvalidLogin] = useState(false);
  const [isInvalidPassword, setIsInvalidPassword] = useState(false);

  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useAppDispatch();

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (loginRef.current === null || passwordRef.current === null) {
      return;
    }

    if (!isEmail(loginRef.current.value)) {
      setIsInvalidLogin(true);
      toast.warn(INVALID_LOGIN_MESSAGE);
      return;
    }
    setIsInvalidLogin(false);

    if (!String(passwordRef.current.value).match(VALID_PASSWORD_REGEX)) {
      setIsInvalidPassword(true);
      toast.warn(INVALID_PASSWORD_MESSAGE);
      return;
    }
    setIsInvalidPassword(false);


    dispatch(loginAction({
      login: loginRef.current.value,
      password: passwordRef.current.value
    }));

  };

  return (
    <>
      <Helmet>
        <title>WTW. Auth</title>
      </Helmet>

      <div className="user-page" data-testid="auth-screen">
        <header className="page-header user-page__head">
          <Logo />

          <h1 className="page-title user-page__title">Sign in</h1>
        </header>

        <div className="sign-in user-page__content">
          <form action="#" className="sign-in__form" onSubmit={handleSubmit}>
            {
              isInvalidLogin || isInvalidPassword
                ? (
                  <div className="sign-in__message">
                    <p>{isInvalidLogin && INVALID_LOGIN_MESSAGE || isInvalidPassword && INVALID_PASSWORD_MESSAGE}</p>
                  </div>)
                : ''
            }
            <div className="sign-in__fields">
              <div className={`sign-in__field ${isInvalidLogin ? 'sign-in__field--error' : ''}`}>
                <input
                  ref={loginRef}
                  className="sign-in__input" type="email" placeholder="Email address" name="user-email" id="user-email"
                  data-testid="login"
                />
                <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
              </div>
              <div className={`sign-in__field ${isInvalidPassword ? 'sign-in__field--error' : ''}`}>
                <input
                  ref={passwordRef}
                  className="sign-in__input" type="password" placeholder="Password" name="user-password" id="user-password"
                  data-testid="password"
                />
                <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
              </div>
            </div>
            <div className="sign-in__submit">
              <button className="sign-in__btn" type="submit">Sign in</button>
            </div>
          </form>
        </div >

        <Footer />
      </div >
    </>
  );
};

export default AuthScreen;
