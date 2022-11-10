import { useState } from 'react';
import { createBlog } from '../reducers/blogs';
import { useDispatch } from 'react-redux';

const AddBlogForm = (props) => {
  const [blogTitle, setBlogTitle] = useState('');
  const [blogAuthor, setBlogAuthor] = useState('');
  const [blogUrl, setBlogUrl] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(createBlog({
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl,
    }));
    setBlogAuthor('');
    setBlogTitle('');
    setBlogUrl('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          Title
          <input
            className="titleInput"
            type="text"
            onChange={({ target }) => setBlogTitle(target.value)}
            value={blogTitle}
          />
        </div>
        <div>
          Author
          <input
            className="authorInput"
            type="text"
            onChange={({ target }) => setBlogAuthor(target.value)}
            value={blogAuthor}
          />
        </div>
        <div>
          Url
          <input
            className="urlInput"
            type="text"
            onChange={({ target }) => setBlogUrl(target.value)}
            value={blogUrl}
          />
        </div>

        <button type="submit">add blog</button>
      </form>
    </div>
  );
};

export default AddBlogForm;
