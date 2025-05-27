
/*eslint linebreak-style: ["error", "windows"]*/

import React from 'react';
import { useDispatch } from 'react-redux';
import { asyncRegisterUser } from '../states/users/action';
import { IoEarthOutline } from 'react-icons/io5';
import RegisterInput from '../components/RegisterInput';
import { Link, useNavigate } from 'react-router-dom';


function RegisterPage(){
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onRegister = ({ name, email, password }) =>{
    dispatch(asyncRegisterUser({ name, email, password }));

    navigate('/');
  };
  return (
    <section className="register-page">
      <header className="register-page__hero">
        <h1><IoEarthOutline /></h1>
      </header>
      <article className="register-page__main">
        <h2>Create your account</h2>
        <RegisterInput register={onRegister} />
        <p>
              Already have an account?
          {' '}
          <Link to="/">Login</Link>
        </p>
      </article>
    </section>
  );
}

export default RegisterPage;