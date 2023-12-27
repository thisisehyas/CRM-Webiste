import { useState } from "react";
import BlogsList from "./blogslist";

const Home = () => {
  const [blogs, setBlogs] = useState([
    {
      title: "I'm learning React now!",
      body: "lorem ipsum...",
      author: "mrym",
      id: 1,
    },
    {
      title: "It fascinates me!",
      body: "lorem ipsum...",
      author: "notMrym",
      id: 2,
    },
    {
      title: "I wish I have started sooner but I can do this.",
      body: "lorem ipsum...",
      author: "mrym",
      id: 3,
    },
  ]);

  const handleDelete = (id) => {
    const newBlogs = blogs.filter(blog => blog.id !== id);
    setBlogs(newBlogs);
  };

  return (
    <div className="home">
      <BlogsList blogs={blogs} title="All blogs!" deleteButton={handleDelete} />
      <BlogsList
        blogs={blogs.filter((blog) => blog.author === "mrym")}
        title="mrym's blogs!"
        deleteButton={handleDelete}
      />
    </div>
  );
};

export default Home;
