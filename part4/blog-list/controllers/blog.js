const blogRouter = require('express').Router();
const Blog = require('../models/blog');

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogRouter.get('/:id', async (request, response) => {
  const blogs = await Blog.findById(request.params.id);
  response.json(blogs);
});

blogRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body);
  const result = await blog.save();
  response.status(201).json(result);
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
