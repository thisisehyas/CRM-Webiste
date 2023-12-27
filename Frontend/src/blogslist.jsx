const BlogsList = ({blogs, title, deleteButton}) => {

  return (
    <div className="blogsList">
        <h2>{title}</h2>
      {blogs.map((blog) => (
        <div className="blog-preview" key={blog.id}>
          <h2>{blog.title}</h2>
          <p>{blog.author}</p>
          <button onClick={() => deleteButton(blog.id)}>delete blog</button>
        </div>
      ))}
    </div>
  );
};

export default BlogsList; 
