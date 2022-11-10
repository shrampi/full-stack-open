import { useState } from 'react';
import PropTypes from 'prop-types';

const Blog = ({ blog, incrementLikes, removeBlog }) => {
  const [showDetails, setShowDetails] = useState(false);

  Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    incrementLikes: PropTypes.func.isRequired,
    removeBlog: PropTypes.func.isRequired,
  };

  const hideIfNotVisible = { display: showDetails ? '' : 'none' };

  return (
    <div style={{ border: 'solid', borderWidth: 1 }}>
      <div className="blogTitle">
        {blog.title}
        <button
          className="toggleButton"
          onClick={() => setShowDetails(!showDetails)}
        >
          {showDetails ? 'hide' : 'view'}{' '}
        </button>
      </div>
      <div className="blogDetails" style={hideIfNotVisible}>
        <div className="blogAuthor">{blog.author}</div>
        <div className="blogUrl">{blog.url}</div>
        <div className="blogLikes">
          {blog.likes}
          <button onClick={() => incrementLikes(blog)}>like</button>
        </div>
        <div>
          <button onClick={() => removeBlog(blog)}>remove</button>
        </div>
      </div>
    </div>
  );
};

export default Blog;
