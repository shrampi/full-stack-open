import { useState } from 'react';

const AddBlogForm = (props) => {
  const [blogTitle, setBlogTitle] = useState('');
  const [blogAuthor, setBlogAuthor] = useState('');
  const [blogUrl, setBlogUrl] = useState('');

  return (
    <div>
      <form onSubmit={(event) => {
        event.preventDefault();
        props.addBlog({
          title: blogTitle,
          author: blogAuthor,
          url: blogUrl
        });
        setBlogAuthor('');
        setBlogTitle('');
        setBlogUrl('');
      }}>
        <div>Title<input type='text' onChange={({ target }) => setBlogTitle(target.value)} value={blogTitle} /></div>
        <div>Author<input type='text' onChange={({ target }) => setBlogAuthor(target.value)} value={blogAuthor} /></div>
        <div>Url<input type='text' onChange={({ target }) => setBlogUrl(target.value)} value={blogUrl} /></div>

        <button type='submit'>add blog</button>
      </form>
    </div>
  )
}

export default AddBlogForm;