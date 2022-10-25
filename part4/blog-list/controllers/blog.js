const blogRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const Blog = require('../models/blog');
const User = require('../models/user');
const logger = require('../utils/logger');


blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
    .populate('user', { name: 1, username: 1, _id: 1});
  response.json(blogs);
});

blogRouter.get('/:id', async (request, response) => {
  const blogs = await Blog.findById(request.params.id)
    .populate('user', { name: 1, username: 1, _id: 1});
  response.json(blogs);
});

blogRouter.post('/', async (request, response) => {
  const { token } = request;
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(400).send({ error: 'token missing or invalid' });
  }
  
  const user = await User.findOne({ username: decodedToken.username}); 
  
  if (!user) {
    return response.status(500).send({ error: 'user not in db'});
  }
  
  const blog = new Blog({...request.body, user: user._id});
  const savedBlog = await blog.save();

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save();
  
  logger.info(`user ${user.username} added new blog ${savedBlog.title}`);
  response.status(201).json(savedBlog);
});

blogRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id);
  response.status(204).send();
});

blogRouter.put('/:id', async (request, response) => {
  console.log('here');
  const body = request.body;
  const blog = {
    title: body.title,
    author: body.author,
    likes: body.likes,
    url: body.url
  };

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    blog,
    { new: true, runValidators: true, context: 'query' }
  );
  response.status(200).json(updatedBlog);
});

module.exports = blogRouter;
