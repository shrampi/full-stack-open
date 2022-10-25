const supertest = require('supertest');
const app = require('../app');
const bcrypt = require('bcrypt');
const helper = require('./test_helper')
const User = require('../models/user');
const Blog = require('../models/blog');

const api = supertest(app);

describe('user tests:', () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const passwordHash = await bcrypt.hash('secret', 10);
    const user = new User({
      password: passwordHash,
      username: 'root'
    })
    await user.save(); 
    await Blog.deleteMany({});
    const blogObjects = helper.initialBlogs.map((b) => new Blog(b));
    const promiseArray = blogObjects.map((b) => b.save());
    await Promise.all(promiseArray);
  })

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

  test('login and create new post works', async () => {
    const user = {
      username: 'root',
      password: 'secret'
    }

    const response = await api.post('/api/login').send(user).expect(201);
    const token = response.body.token;

    const blog = {
      title: 'Thiccness',
      author: 'Dummy',
      url: 'www.usa.gov',
      likes: 1
    }
    const oldBlogs = helper.blogsInDB();
    await api.post('/api/blogs').set('Authorization', `bearer ${token}`).send(blog).expect(201);
    const newBlogs = helper.blogsInDB();
    expect(newBlogs).toHaveLength(oldBlogs.length + 1);

  })

  test('error when username already in database', async () => {
    const user = new User({
      password: 'secret',
      username: 'root'
    })
    await api.post('/api/users').send(user).expect(400);
  })

  test('error for invalid username', async () => {
    const user1 = {
      password: 'secret',
    }
    await api.post('/api/users').send(user1).expect(400);
    const user2 = {
      password: 'secret',
      username: 'Do'
    }
    await api.post('/api/users').send(user2).expect(400);
  })

  test('error for invalid password', async () => {
    const user1 = {
      username: 'Donkey'
    }
    await api.post('/api/users').send(user1).expect(400);
    const user2 = {
      username: 'Donkey',
      password: 'se'
    }
    await api.post('/api/users').send(user2).expect(400);
  })

  test('single user created', async () => {
    const oldUsers = await helper.usersInDB();
    const user = {
      password: 'secret',
      username: 'donkey'
    }
    await api.post('/api/users').send(user).expect(201);
    const newUsers = await helper.usersInDB();

    expect(newUsers).toHaveLength(oldUsers.length + 1);
  })

  test('all users retrieved', async () => {
    const res = await api.get('/api/users').expect(200);
    expect(res.body).toHaveLength(1);
  })
})
