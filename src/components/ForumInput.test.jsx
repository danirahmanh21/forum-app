/* eslint-disable linebreak-style */
// test scenario for ForumInput Component
// ForumInput component
// 1.should handle title, category, and body typing correctly
// 2.should call addForum function when Submit button is clicked
import matchers from '@testing-library/jest-dom/matchers';
import { cleanup, render, screen } from '@testing-library/react';
import React from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import ForumInput from './ForumInput';
import userEvent from '@testing-library/user-event';

expect.extend(matchers);

describe('ForumInput component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle title, category, and body typing correctly', async () => {
    render(<ForumInput addForum={() => {}} />);

    await userEvent.type(screen.getByPlaceholderText('Enter thread title...'), 'Thread Title');
    await userEvent.type(screen.getByPlaceholderText('Category'), 'React');
    await userEvent.type(screen.getByPlaceholderText('What are you asking?'), 'This is the thread body');

    expect(screen.getByPlaceholderText('Enter thread title...')).toHaveValue('Thread Title');
    expect(screen.getByPlaceholderText('Category')).toHaveValue('React');
    expect(screen.getByPlaceholderText('What are you asking?')).toHaveValue('This is the thread body');
  });

  it('should call addForum function when Submit button is clicked', async () => {
    const mockAddForum = vi.fn();
    render(<ForumInput addForum={mockAddForum} />);

    await userEvent.type(screen.getByPlaceholderText('Enter thread title...'), 'Test Title');
    await userEvent.type(screen.getByPlaceholderText('Category'), 'Testing');
    await userEvent.type(screen.getByPlaceholderText('What are you asking?'), 'Test body content');

    await userEvent.click(screen.getByRole('button', { name: 'Submit' }));

    expect(mockAddForum).toBeCalledWith({
      title: 'Test Title',
      body: 'Test body content',
      category: 'Testing',
    });
  });
});