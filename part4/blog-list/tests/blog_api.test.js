const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const helper = require('./test_helper');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  const blogObjects = helper.initialBlogs.map((b) => new Blog(b));
  const promiseArray = blogObjects.map((b) => b.save());
  await Promise.all(promiseArray);
});

test('blogs retrieved as json', async () => {
  await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('all blogs are retreived', async () => {
  const response = await api.get('/api/blogs');
  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test('blog info is correct', async () => {
  const response = await api.get('/api/blogs');
  const titles = response.body.map((b) => b.title);
  expect(titles).toContain(helper.initialBlogs[0].title);
});

test('blog id is called "id"', async () => {
  const response = await api.get('/api/blogs');
  expect(response.body[0].id).toBeDefined();
});

test('blog post is successful', async () => {
  const newBlog = {
    title: 'The Rice and Beans',
    author: 'Ms. Monkey',
    url: 'dingo.com',
    likes: 20
  };

  await api.post('/api/blogs').send(newBlog)
    .expect(201);
  const response = await api.get('/api/blogs');
  expect(response.body).toHaveLength(helper.initialBlogs.length + 1);
});

test('likes default to 0 if empty', async () => {
  const newBlog = {
    title: 'The Rice and Beans',
    author: 'Ms. Monkey',
    url: 'dingo.com'
  };

  await api.post('/api/blogs').send(newBlog)
    .expect(201);
  const response = await api.get('/api/blogs');
  const { likes } = response.body.find((blog) => blog.title === 'The Rice and Beans');
  expect(likes).toBe(0);
});

test('check status 400 for missing title or url', async () => {
  const newBlog = {
    author: 'Ham Man'
  };

  await api.post('/api/blogs').send(newBlog).expect(400);
});

afterAll(() => {
  mongoose.connection.close();
});
