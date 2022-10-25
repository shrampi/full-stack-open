const supertest = require('supertest');
const app = require('../app');
const bcrypt = require('bcrypt');
const helper = require('./test_helper')
const User = require('../models/user');

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
  })

  test('error when username already in database', async () => {
    const user = new User({
      password: 'secret',
      username: 'root'
    })
    await api.post('/api/users').send(user).expect(400);
  })

  test('error for empty username', async () => {
    const user = {
      password: 'secret',
      username: ''
    }
    await api.post('/api/users').send(user).expect(400);
  })

  test('error for empty password', async () => {
    const user = {
      password: '',
      username: 'Donkey'
    }
    await api.post('/api/users').send(user).expect(400);
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
    console.log(res.body);
    expect(res.body).toHaveLength(1);
  })
})
