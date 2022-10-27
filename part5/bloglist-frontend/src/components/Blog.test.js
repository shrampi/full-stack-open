import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import Blog from './Blog';
import userEvent from '@testing-library/user-event';

let container;
let blog;
let incrementLikes;

beforeEach(() => {
  blog = {
    title: 'birds',
    author: 'the big bird',
    url: 'www.bird.com',
    likes: 0
  }
  incrementLikes = jest.fn();
  const removeBlog = jest.fn();
  container = render(<Blog blog={blog} incrementLikes={incrementLikes} removeBlog={removeBlog} />).container;
})

test('blog renders title but not author/url/likes by default', () => {
  expect(container.querySelector('.blogTitle')).not.toHaveStyle('display: none');
  expect(container.querySelector('.blogDetails')).toHaveStyle('display: none');
})

test('blog renders details when button is clicked', async () => {
  const user = userEvent.setup();
  const button = container.querySelector('.toggleButton');
  await user.click(button);

  expect(container.querySelector('.blogTitle')).not.toHaveStyle('display: none');
  expect(container.querySelector('.blogDetails')).not.toHaveStyle('display: none');
})

test('incrementLikes is called per each button click', async () => {
  const user = userEvent.setup();
  const button = screen.getByText('like');

  await user.click(button);
  await user.click(button);

  expect(incrementLikes.mock.calls).toHaveLength(2);
})