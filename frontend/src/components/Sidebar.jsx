
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-64 min-h-screen bg-gray-900 text-white p-5">
      
      {/* Logo */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-amber-500">
          MyBlog
        </h1>
      </div>

      {/* Navigation */}
      <nav>
        <ul className="space-y-2">

          <li>
            <Link
              to="/home"
              className="block rounded-lg px-4 py-3 hover:bg-gray-800 transition"
            >
              🏠 Home
            </Link>
          </li>

          <li>
            <Link
              to="/createBlog"
              className="block rounded-lg px-4 py-3 hover:bg-gray-800 transition"
            >
              ✍️ Create Blog
            </Link>
          </li>

          <li>
            <Link
              to="/about"
              className="block rounded-lg px-4 py-3 hover:bg-gray-800 transition"
            >
              ℹ️ About
            </Link>
          </li>

          <li>
            <Link
              to="/contact"
              className="block rounded-lg px-4 py-3 hover:bg-gray-800 transition"
            >
              📩 Contact
            </Link>
          </li>

        </ul>
      </nav>

      {/* Bottom section */}
      <div className="mt-auto pt-10">
        <button className="w-full rounded-lg bg-red-500 px-4 py-3 font-medium hover:bg-red-600 transition">
          Logout
        </button>
      </div>

    </aside>
  );
};

export default Sidebar;

