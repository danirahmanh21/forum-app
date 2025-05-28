/* eslint-disable linebreak-style */
import React from 'react';
import matchers from '@testing-library/jest-dom/matchers';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import RegisterInput from './RegisterInput';
import userEvent from '@testing-library/user-event';

// test scenario for RegisterInput Component
// RegisterInput component
// 1.should handle name,email,password typing correctly
// 2.should call register function when Register button is clicked
expect.extend(matchers);

describe('RegisterInput component', () =>{
  afterEach(() =>{
    cleanup();
  });

  it('should handle name,email,password typing correctly', async () => {
    render(<RegisterInput register = {() => {}}/>);

    const nameInput = screen.getByPlaceholderText('Name');
    const emailInput = screen.getByPlaceholderText('E-mail');
    const passwordInput = screen.getByPlaceholderText('Password');

    await userEvent.type(nameInput, 'tes1');
    await userEvent.type(emailInput, 'emailtest@tes.com');
    await userEvent.type(passwordInput, 'passwordtest');

    expect(nameInput).toHaveValue('tes1');
    expect(emailInput).toHaveValue('emailtest@tes.com');
    expect(passwordInput).toHaveValue('passwordtest');
  });
  it('should call register function when Register button is clicked', async () => {
    const mockRegister = vi.fn();
    render(<RegisterInput register={mockRegister} />);

    await userEvent.type(screen.getByPlaceholderText('Name'), 'tes1');
    await userEvent.type(screen.getByPlaceholderText('E-mail'), 'emailtest@tes.com');
    await userEvent.type(screen.getByPlaceholderText('Password'), 'passwordtest');

    await userEvent.click(screen.getByRole('button', { name: 'Register' }));

    expect(mockRegister).toBeCalledWith({
      name: 'tes1',
      email: 'emailtest@tes.com',
      password: 'passwordtest',
    });
  });
});
