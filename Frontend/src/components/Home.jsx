import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Redirect if no JWT
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  // Fetch All Courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("https://cyber-war-fare-task-zuaj.vercel.app/course", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        setCourses(res.data.courses);
      } catch (error) {
        console.log("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-2xl font-semibold">
        Loading courses...
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center">Available Courses</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course._id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:scale-[1.02] transition cursor-pointer"
            onClick={() => navigate(`/course/${course._id}`)}
          >
            <img
              src={course.image || "https://via.placeholder.com/300"}
              alt={course.title}
              className="w-full h-40 object-cover"
            />

            <div className="p-4">
              <h2 className="text-xl font-semibold">{course.title}</h2>

              <p className="text-gray-600 text-sm mt-2 line-clamp-3">
                {course.description}
              </p>

              <div className="mt-3">
                {course.price === 0 ? (
                  <span className="text-green-600 font-bold text-lg">Free</span>
                ) : (
                  <span className="text-blue-600 font-bold text-lg">
                    ₹{course.price}
                  </span>
                )}
              </div>

              <button className="mt-4 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
