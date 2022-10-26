const blogRouter = require('express').Router();
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
  
  const user = await User.findById(request.user); 
  
  if (!user) {
    return response.status(400).send({ error: 'user not in db'});
  }
  
  const blog = new Blog({...request.body, user: user._id});
  const savedBlog = await blog.save();

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save();
  
  logger.info(`user ${user.username} added new blog ${savedBlog.title}`);
  response.status(201).json(savedBlog);
});

blogRouter.delete('/:id', async (request, response) => {
  const user = await User.findById(request.user); 

  if (!user) {
    return response.status(400).send({ error: 'user not in db'});
  }
  
  const blogToDelete = await Blog.findById(request.params.id);
  if (!blogToDelete) {
    return response.status(400).send({ error: 'blog does not exist' });
  }

  if (blogToDelete.user.toString() === user._id.toString()) {
    await Blog.findByIdAndDelete(request.params.id);
    logger.info(`user ${user.username} delete blog ${blogToDelete.title}`);
    return response.status(204).send();
  }
  response.status(400).send({ error: `blog does not belong to user ${user.username}` });
});

blogRouter.put('/:id', async (request, response) => {
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
