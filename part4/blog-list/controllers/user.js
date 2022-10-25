const userRouter = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');

const validateInput = (input) => {
  return (!input || input.length < 3);
}

userRouter.post('/', async (req, res) => {
  const { username, password, name } = req.body;

  if (validateInput(username)) {
    return res.status(400).send({ error: 'invalid username'});
  }

  if (validateInput(password)) {
    return res.status(400).send({ error: 'invalid password'});
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username: username,
    password: passwordHash,
    name: name
  });

  const savedUser = await user.save();
  res.status(201).json(savedUser);
});

userRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate(
    'blogs', 
    { title: 1, url: 1, likes: 1}
  );
  res.status(200).json(users);
})

module.exports = userRouter;