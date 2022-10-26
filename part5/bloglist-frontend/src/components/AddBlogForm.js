
const AddBlogForm = (props) => {
  return (
    <div>
      <form onSubmit={props.onSubmit}>
        <div>Title<input type='text' onChange={props.onTitleChange} value={props.blogTitle} /></div>
        <div>Author<input type='text' onChange={props.onAuthorChange} value={props.blogAuthor} /></div>
        <div>Url<input type='text' onChange={props.onUrlChange} value={props.blogUrl} /></div>

        <button type='submit'>add blog</button>
      </form>
    </div>
  )
}

export default AddBlogForm;