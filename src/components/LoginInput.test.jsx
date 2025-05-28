/* eslint-disable linebreak-style */
// test scenario for LoginInput
// LoginInput component
// 1.should handle email typing correctly
// 2.should handle password typing correctly
// 3.should call login function when login button is clicked
import { cleanup, render, screen } from '@testing-library/react';
import React from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import LoginInput from './LoginInput';
import userEvent from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);

describe('LoginInput component', () => {
  afterEach(() =>{
    cleanup();
  });

  it('should handle email typing correctly', async () => {
    //arrange
    render(<LoginInput login= {() => {}}/>);
    const emailInput = await screen.getByPlaceholderText('Email');
    //action
    await userEvent.type(emailInput, 'emailtest@tes.com');

    //assert
    expect(emailInput).toHaveValue('emailtest@tes.com');
  });

  it('should handle password typing correctly', async () => {
    //arrange
    render(<LoginInput login= {() => {}}/>);
    const passwordInput = await screen.getByPlaceholderText('Password');
    //action
    await userEvent.type(passwordInput, 'passwordtest');
    //assert
    expect(passwordInput).toHaveValue('passwordtest');
  });

  it('should call login function when login button is clicked', async () => {
    //arrange
    const mockLogin = vi.fn();
    render(<LoginInput login={mockLogin} />);
    const emailInput = await screen.getByPlaceholderText('Email');
    await userEvent.type(emailInput, 'emailtest@tes.com');
    const passwordInput = await screen.getByPlaceholderText('Password');
    await userEvent.type(passwordInput, 'passwordtest');
    const loginButton = await screen.getByRole('button', { name:'Login' });
    //action
    await userEvent.click(loginButton);
    //assert
    expect(mockLogin).toBeCalledWith({
      email:'emailtest@tes.com',
      password:'passwordtest',
    });
  });
});