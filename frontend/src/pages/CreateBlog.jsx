import axios from "axios";
import { useState } from "react";
import { data } from "react-router-dom";

const CreateBlog = () => {
  const [formData, setFromData] = useState({
    title: "",
    description: "",
    coverImage: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFromData({
      ...formData,
      [name]: value,
    });
  };
  const createBlog = async(e)=>{
    e.preventDefault()
    const response = await axios.post("http://localhost:9000/blog/create", formData)
    console.log(response)

  }
  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="mx-auto max-w-2xl rounded-xl bg-white p-8 shadow-md">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Create a new blog
          </h1>

          <p className="mt-2 text-gray-500">
            Share your thoughts and ideas with the community.
          </p>
        </div>

        <form onSubmit={createBlog} className="space-y-6">
          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Blog Title
            </label>

            <input
              id="title"
              name="title"
              type="text"
              placeholder="Enter your blog title"
              value={formData.title}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Description
            </label>

            <textarea
              id="description"
              name="description"
              rows="8"
              placeholder="Write your blog description..."
              value={formData.description}
              onChange={handleChange}
              className="w-full resize-y rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Cover Image */}
          <div>
            <label
              htmlFor="coverImage"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Cover Image
            </label>

            <input
              id="coverImage"
              type="file"
              name="coverImage"
              accept="image/*"
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

            <p className="mt-2 text-sm text-gray-500">
              Upload your blog cover image.
            </p>
          </div>
           {/* Author ID */}
          <div className="form-group">
            <label htmlFor="authorId">
              Author ID
            </label>

            <input
              id="authorId"
              name="authorId"
              type="number"
              placeholder="Enter author ID"
              value={formData.authorId}
              onChange={handleChange}
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Create Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;
