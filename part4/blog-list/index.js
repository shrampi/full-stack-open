require('dotenv').config();

// const http = require('http');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

const Blog = mongoose.model('Blog', blogSchema);

const mongoUrl = process.env.MONGODB_URI;

mongoose.connect(mongoUrl)
  .then(() => console.log('connected to mongoDB'))
  .catch((error) => console.log('error connecting to mongoDB: ', error));

app.use(cors());
app.use(express.json());

app.get('/api/blogs', (request, response) => {
  console.log('here');
  Blog
    .find({})
    .then((blogs) => {
      response.json(blogs);
    });
});

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body);

  blog
    .save()
    .then((result) => {
      response.status(201).json(result);
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
