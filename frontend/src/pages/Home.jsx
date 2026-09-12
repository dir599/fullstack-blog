import  { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import axios from "axios";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const fetchBlogs = async () => {
    const response = await axios.get("http://localhost:9000/blog/get");
    setBlogs(response.data.data);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div>
      <div className="rounded-xl">
        <Navbar />
      </div>
      <div className="pt-1 flex flex-wrap gap-6 justify-center">
        {blogs.map((blog) => {
          return <Card key= {blog.id} value={blog} />;
        })}
      </div>
    </div>
  );
};

export default Home;
