import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");

  // Get existing blog
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9000/blog/update/${id}`,
          {
            withCredentials: true,
          },
        );

        const blog = response.data.data;
        if (response.status === 200) {
          alert("Blog updated successfully");
          navigate("/home");
        }

        setFormData({
          title: blog.title,
          description: blog.description,
        });
      } catch (error) {
        console.error(error);
        setError("Failed to load blog");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Update blog
  const handleSubmit = async (e) => {
    e.preventDefault();

    setUpdating(true);
    setError("");

    try {
      await axios.patch(`http://localhost:9000/blog/update/${id}`, formData, {
        withCredentials: true,
      });

      navigate(`/blog/${id}`);
    } catch (error) {
      console.error(error);

      setError(error.response?.data?.message || "Failed to update blog");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex justify-center items-center min-h-screen">
          <p>Loading blog...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="max-w-3xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold mb-8">Edit Blog</h1>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block mb-2 font-medium">Title</label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3 outline-none"
              placeholder="Enter blog title"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-2 font-medium">Description</label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="8"
              className="w-full border rounded-lg px-4 py-3 outline-none"
              placeholder="Enter blog description"
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={updating}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {updating ? "Updating..." : "Update Blog"}
            </button>

            <button
              type="button"
              onClick={() => navigate(`/blog/${id}`)}
              className="border px-6 py-3 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditBlog;
