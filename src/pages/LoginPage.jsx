/*eslint linebreak-style: ["error", "windows"]*/

import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { asyncSetAuthUser } from '../states/authUser/action';
import LoginInput from '../components/LoginInput';
import { useEffect } from 'react';
import gsap from 'gsap';


function LoginPage() {
  const dispatch = useDispatch();
  const formRef = useRef();

  const onLogin = ({ email, password }) => {
    dispatch(asyncSetAuthUser({ email, password }));
  };
  useEffect(() => {
    if (formRef.current) {
      gsap.fromTo(
        formRef.current,
        {y: 30, opacity: 0},
        {y: 0, 
          opacity: 1, 
          duration: 0.2, 
          ease: 'power2.out',
        }
      );
    }
  },[]);

  return (
    <section className='login-page'>
      <div className='auth-header'>
        <h1>Forum App</h1>
        <p>Have a question? Let's Come in</p>
      </div>
      <div className='auth-container' ref={formRef}>
        <h2>Login to your account</h2>
        <LoginInput login={onLogin} />
        <p>
          Don&apos;t have an account?
          {' '}
          <Link to="/register">Register</Link>
        </p>
      </div>
    </section>
  );
}
export default LoginPage;
// return (
  //   <section className="login-page">
  //     <header className="login-page__header">
  //       <h1 className="login-page__title">Forum App</h1>
  //       <p className="login-page__subtitle">See the world as a forum</p>
  //     </header>
  //     <article className="login-page__main">
  //       <LoginInput login={onLogin} />
  //       <p>
  //         Don&apos;t have an account?
  //         {' '}
  //         <Link to="/register">Register</Link>
  //       </p>
  //     </article>
  //   </section>
  // );