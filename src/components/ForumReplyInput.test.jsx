/* eslint-disable linebreak-style */
import matchers from '@testing-library/jest-dom/matchers';
import { cleanup, render, screen } from '@testing-library/react';
import React from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import ForumReplyInput from './ForumReplyInput';
import userEvent from '@testing-library/user-event';

expect.extend(matchers);

describe('ForumReplyInput component', () => {
  afterEach(() => {
    cleanup();
  });
  it('should handle body typing correctly', async () => {
    render(<ForumReplyInput replyForum={() => {}} />);

    const textarea = screen.getByPlaceholderText('send a reply');
    await userEvent.type(textarea, 'This is a reply');

    expect(textarea).toHaveValue('This is a reply');
  });

  it('should call replyForum function when reply button is clicked', async () => {
    const mockReplyForum = vi.fn();

    render(<ForumReplyInput replyForum={mockReplyForum} />);

    const textarea = screen.getByPlaceholderText('send a reply');
    await userEvent.type(textarea, 'Test reply content');

    const button = screen.getByRole('button', { name:'Reply' });
    await userEvent.click(button);

    expect(mockReplyForum).toBeCalledWith('Test reply content');
  });
});