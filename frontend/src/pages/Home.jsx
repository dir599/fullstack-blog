import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import axios from "axios";
import Sidebar from "../components/Sidebar";

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
     <div className="flex">
       <div>
        <Sidebar />
      </div>
      <main className="flex-1 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => {
            return <Card key={blog.id} value={blog} />;
          })}
        </div>
      </main>
     </div>
    </div>
  );
};

export default Home;
