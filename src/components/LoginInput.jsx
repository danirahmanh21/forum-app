/*eslint linebreak-style: ["error", "windows"]*/
import React from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';
import { Button, Form, Input } from '../styles/LoginInput.styled';

function LoginInput({ login }){
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  return (
    <Form className="auth-container">
      <Input type="email" value={email} onChange={onEmailChange} placeholder="Email"/>
      <Input type="password" value={password} onChange={onPasswordChange} placeholder="Password"/>
      <Button type="button" onClick={()=>login({ email, password })}>Login</Button>
    </Form>
  );
}
LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginInput;