
/*eslint linebreak-style: ["error", "windows"]*/
import React, { useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { gsap } from 'gsap';
import RegisterInput from '../components/RegisterInput'; // make sure the path is correct
import { asyncRegisterUser } from '../states/users/action'; // adjust path if needed

function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formRef = useRef();

  const onRegister = ({ name, email, password }) => {
    dispatch(asyncRegisterUser({ name, email, password }));
    navigate('/');
  };

  useEffect(() => {
    gsap.fromTo(
  formRef.current,
  { y: 30, opacity: 0 },
  {
    y: 0,
    opacity: 1,
    duration: 0.6,
    ease: 'power2.out',
  }
);
  }, []);

  return (
    <section className="register-page">
      <div className="auth-header">
        <h1>Forum App</h1>
        <p>Have a question? Let's Come in</p>
      </div>
      <div className="auth-container" ref={formRef}>
        <h2>Create your account</h2>
        <RegisterInput register={onRegister} />
        <div className="auth-footer">
        <p>
          Already have an account? 
          {' '}
          <Link to="/">Login</Link>
        </p>
        </div>
      </div>
    </section>
  );
}

export default RegisterPage;
// import React from 'react';
// import { useDispatch } from 'react-redux';
// import { asyncRegisterUser } from '../states/users/action';
// import { IoEarthOutline } from 'react-icons/io5';
// import RegisterInput from '../components/RegisterInput';
// import { Link, useNavigate } from 'react-router-dom';


// function RegisterPage(){
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const onRegister = ({ name, email, password }) =>{
//     dispatch(asyncRegisterUser({ name, email, password }));

//     navigate('/');
//   };
//   return (
//     <section className="register-page">
//       <header className="register-page__hero">
//         <h1 className="login-page__title">Forum App</h1>
//         <p className="login-page__subtitle">Have a question? Let's Come in</p>
//       </header>
//       <article className="register-page__main">
//         <h2>Create your account</h2>
//         <RegisterInput register={onRegister} />
//         <p>
//               Already have an account?
//           {' '}
//           <Link to="/">Login</Link>
//         </p>
//       </article>
//     </section>
//   );
// }

// export default RegisterPage;