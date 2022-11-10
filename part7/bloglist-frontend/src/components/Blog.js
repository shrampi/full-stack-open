import { useState } from 'react';
import PropTypes from 'prop-types';
import { incrementLikes, removeBlog } from '../reducers/blogs';
import { useDispatch } from 'react-redux';

const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false);
  const dispatch = useDispatch();

  Blog.propTypes = {
    blog: PropTypes.object.isRequired,
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
          <button onClick={() => dispatch(incrementLikes(blog))}>like</button>
        </div>
        <div>
          <button onClick={() => dispatch(removeBlog(blog))}>remove</button>
        </div>
      </div>
    </div>
  );
};

export default Blog;
