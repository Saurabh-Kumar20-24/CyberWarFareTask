import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-gray-50 shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      {/* Logo */}
      <h1
        className="text-2xl font-bold text-blue-600 cursor-pointer"
        onClick={() => navigate("/")}
      >
        CoursesApp
      </h1>

      {/* Links */}
      <div className="flex items-center gap-6">

        {token && (
          <>
            <Link
              to="/"
              className="text-gray-700 font-bold hover:text-blue-600 transition"
            >
              Home
            </Link>

            <Link
              to="/my-courses"
              className="text-gray-700 font-bold hover:text-blue-600 transition"
            >
              My Courses
            </Link>

            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
            >
              Logout
            </button>
          </>
        )}

        {!token && (
          <>
            <Link
              to="/login"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
