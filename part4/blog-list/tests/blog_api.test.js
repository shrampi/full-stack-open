const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const User = require('../models/user');
const helper = require('./test_helper');
const bcrypt = require('bcrypt');

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});
  const passwordHash = await bcrypt.hash('secret', 10);
  const rootUser = new User({
    username: 'root',
    password: passwordHash,
    name: 'Big Tony'
  });
  await rootUser.save();

  await Blog.deleteMany({});
  const blogObjects = helper.initialBlogs.map((b) => new Blog(b));
  const promiseArray = blogObjects.map((b) => b.save());
  await Promise.all(promiseArray);
});

test('status 401 when wrong password entered', async () => {
  const credentials = { username: 'root', password: 'dingo' };
  await api.post('/api/login').send(credentials).expect(401);
});

test('status 401 when wrong username entered', async () => {
  const credentials = { username: 'dingo', password: 'secret' };
  await api.post('/api/login').send(credentials).expect(401);
});

test('status 200 when correct credentials entered', async () => {
  const credentials = { username: 'root', password: 'secret' };
  await api.post('/api/login').send(credentials).expect(201);
})

test('status 401 when post a blog with wrong token', async () => {
  const token = 'nicetry';
  
  const blog = {
    title: 'Pie and Cheese',
    author: 'dingo',
    url: 'www.pie.com', 
    likes: 0
  }

  await api.post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(blog)
    .expect(401);
})

test('post a single blog is successful', async () => {
  const credentials = { username: 'root', password: 'secret' };
  const response = await api.post('/api/login').send(credentials).expect(201);

  const token = response.body.token;
  
  const blog = {
    title: 'Pie and Cheese',
    author: credentials.username,
    url: 'www.pie.com', 
    likes: 0
  }

  const oldBlogs = await helper.blogsInDB();

  await api.post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(blog)
    .expect(201);

  const newBlogs = await helper.blogsInDB();

  expect(newBlogs).toHaveLength(oldBlogs.length + 1);
})

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

test('blog id is called "_id"', async () => {
  const response = await api.get('/api/blogs');
  expect(response.body[0]._id).toBeDefined();
});

test('likes default to 0 if empty', async () => {

  const credentials = { username: 'root', password: 'secret' };
  const response = await api.post('/api/login').send(credentials).expect(201);

  const token = response.body.token;

  const blog = {
    title: 'Pie and Cheese',
    author: credentials.username,
    url: 'www.pie.com'
  }

  await api.post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(blog)
    .expect(201);

  const blogs = await helper.blogsInDB();
  const savedBlog = blogs.find(b => b.title == 'Pie and Cheese');
  expect(savedBlog.likes).toBe(0);
});

test('status 400 for missing title or url', async () => {
  const credentials = { username: 'root', password: 'secret' };
  const response = await api.post('/api/login').send(credentials).expect(201);

  const token = response.body.token;

  const blog = {
    author: 'Ham Man'
  };

  await api.post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(blog)
    .expect(400);
});

test('login with correct credentials returns token', async () => {
  const user = {
    username: 'root',
    password: 'secret'
  }

  const response = await api.post('/api/login').send(user).expect(201);
  expect(response.body.token).toBeTruthy();
})

test('login with incorrect credentials fails', async () => {
  const user = {
    username: 'root',
    password: 'butt'
  }

  await api.post('/api/login').send(user).expect(401);
})

test('error when username already in database', async () => {
  const user = {
    password: 'secret',
    username: 'root'
  }
  await api.post('/api/users').send(user).expect(400);
})

test('single user created', async () => {
  const oldUsers = await helper.usersInDB();
  const user = {
    password: 'secret',
    username: 'donkey',
    name: 'Beans'
  }
  await api.post('/api/users').send(user).expect(201);
  const newUsers = await helper.usersInDB();

  expect(newUsers).toHaveLength(oldUsers.length + 1);
})

test('all users retrieved', async () => {
  const res = await api.get('/api/users').expect(200);
  expect(res.body).toHaveLength(1);
})

afterAll(() => {
  mongoose.connection.close();
});
