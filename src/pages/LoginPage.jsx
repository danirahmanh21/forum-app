/*eslint linebreak-style: ["error", "windows"]*/

import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { asyncSetAuthUser } from '../states/authUser/action';
import { IoEarthOutline } from 'react-icons/io5';
import LoginInput from '../components/LoginInput';


function LoginPage() {
  const dispatch = useDispatch();

  const onLogin = ({ email, password }) => {
    dispatch(asyncSetAuthUser({ email, password }));
  };

  return (
    <section className="login-page">
      <header className="login-page__hero">
        <h1><IoEarthOutline /></h1>
      </header>
      <article className="login-page__main">
        <h2>
                See
          {' '}
          <strong>The World</strong>
          ,
          {' '}
          <br />
          Through Open Space.
        </h2>

        <LoginInput login={onLogin} />
        <p>
          Don&apos;t have an account?
          {' '}
          <Link to="/register">Register</Link>
        </p>
      </article>
    </section>
  );
}
export default LoginPage;