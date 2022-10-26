import { useState } from 'react';

const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false);

  const hideIfNotVisible = { display: showDetails ? '' : 'none'}

  return (
    <div style={{border: 'solid', borderWidth: 1}}>
      <div>
        {blog.title}
        <button onClick={() => setShowDetails(!showDetails)}>{showDetails ? 'hide' : 'view'} </button>
      </div>
      <div style={hideIfNotVisible}>
        <div>
          {blog.author}
        </div>
        <div>
          {blog.url}
        </div>
        <div>
          {blog.likes}
        </div>
      </div>
    </div>
  )
}

export default Blog