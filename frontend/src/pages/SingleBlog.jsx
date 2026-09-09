import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";

const SingleBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchBlog = async () => {
    try {
      const response = await axios.get(
        `http://localhost:9000/blog/get/${id}`
      );

      setBlog(response.data.data);
    } catch (error) {
      console.log("Error fetching blog:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, [id]);

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (!blog) {
    return <p className="text-center mt-10">Blog not found.</p>;
  }

  const updateBlog = async()=>{
    const response =  await axios.patch(`http://localhost/blog/${id}`)
    // setBlog(response.data.data)
    console.log(response.data)
    if(response.status === 200){
        alert("update successfully")
        useNavigate("/")
    }else{
       alert("can't update")
    }
  }
  const deleteBlog = async()=>{
    const response = await axios.patch(`http://localhost:9000/blog/delete/${id}`,{}, {withCredentials: true})
    console.log(response)
    if(response.status === 200){
        alert("blog delete")
        navigate("/")
    }else{
        alert("blog not delete")
    }
  }
  return (
    <>
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 py-10">

        {/* Cover Image */}
        <div className="w-full h-[450px] overflow-hidden rounded-2xl">
          <img
            src={blog.coverImage}
            alt={blog.title}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Blog Header */}
        <div className="max-w-4xl mx-auto mt-8">

          {/* Category / Date */}
          <div className="text-sm text-gray-500 mb-3">
            Blog • Published recently
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900">
            {blog.title}
          </h1>

          {/* Author / Metadata */}
          <div className="flex items-center gap-3 mt-5 pb-6 border-b">
            <div className="h-10 w-10 rounded-full bg-gray-300"></div>

            <div>
              <p className="font-medium text-gray-900">
                Author
              </p>

              <p className="text-sm text-gray-500">
                Published recently
              </p>
            </div>
          </div>

          {/* Blog Content */}
          <article className="mt-8">
            <p className="text-lg md:text-xl leading-8 text-gray-700 whitespace-pre-line break-words">
              {blog.description}
            </p>
          </article>

          {/* Actions */}
          <div className="flex gap-4 mt-10 pt-6 border-t">
            <button
              className="rounded-lg bg-blue-600 px-6 py-2.5 text-white font-medium
                         hover:bg-blue-700 transition" onClick={updateBlog}
            >
              Edit
            </button>

            <button
              className="rounded-lg bg-red-600 px-6 py-2.5 text-white font-medium
                         hover:bg-red-700 transition" onClick={deleteBlog}
            >
              Delete
            </button>
          </div>

        </div>
      </main>
    </>
  );
};

export default SingleBlog;
