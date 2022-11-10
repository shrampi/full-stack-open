import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import AddBlogForm from './AddBlogForm';
import '@testing-library/jest-dom/extend-expect';

test('Form button triggers submit handler with new blog as param', async () => {
  const mockHandler = jest.fn();
  const { container } = render(<AddBlogForm addBlog={mockHandler} />);

  const user = userEvent.setup();
  const button = screen.getByRole('button');

  const titleField = container.querySelector('.titleInput');
  const authorField = container.querySelector('.authorInput');
  const urlField = container.querySelector('.urlInput');

  await user.type(titleField, 'birds are real');
  await user.type(authorField, 'Dr. Oz');
  await user.type(urlField, 'www.birdtruth.com');

  await user.click(button);

  expect(mockHandler.mock.calls).toHaveLength(1);
  expect(mockHandler.mock.calls[0][0].title).toBe('birds are real');
  expect(mockHandler.mock.calls[0][0].author).toBe('Dr. Oz');
  expect(mockHandler.mock.calls[0][0].url).toBe('www.birdtruth.com');
});
