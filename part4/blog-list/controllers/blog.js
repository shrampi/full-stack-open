const blogRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user');
  response.json(blogs);
});

blogRouter.get('/:id', async (request, response) => {
  const blogs = await Blog.findById(request.params.id)
    .populate('user', { name: 1, username: 1, _id: 1});
  response.json(blogs);
});

blogRouter.post('/', async (request, response) => {
  const user = await User.findOne({});
  
  if (!user) {
    return response.status(500).send({ error: 'no users in db '});
  }
  
  const blog = new Blog({...request.body, user: user._id});
  const savedBlog = await blog.save();

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save();
  
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
