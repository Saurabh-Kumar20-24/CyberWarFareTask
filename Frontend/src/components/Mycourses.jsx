import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MyCourses = () => {
  const navigate = useNavigate();
  const [myCourses, setMyCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Redirect if not logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
  }, [navigate]);

  // Fetch user's enrolled courses
  useEffect(() => {
    const fetchMyCourses = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/subscription/my-courses",
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );

        setMyCourses(res.data.subscriptions);
        
      } catch (error) {
        console.log("Error fetching my courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyCourses();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        Loading your courses...
      </div>
    );
  }

  if (myCourses.length === 0) {
    return (
      <div className="text-center mt-10 text-gray-700">
        <h2 className="text-2xl font-semibold mb-4">No Courses Enrolled Yet</h2>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Browse Courses
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center">
        My Enrolled Courses
      </h1>
         {console.log(myCourses)}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {myCourses.map((item) => (
          <div
            key={item._id}
            className="bg-white shadow-md rounded-xl overflow-hidden"
          >
            <img
              src={
                item.courseId?.image || "https://via.placeholder.com/300x200.png"
              }
              alt={item.courseId?.title}
              className="w-full h-40 object-cover"
            />

            <div className="p-4">
              <h2 className="text-xl font-semibold">
                {item.courseId?.title || "Untitled Course"}
              </h2>

              <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                {item.courseId?.description}
              </p>

              <div className="mt-3">
                <span className="text-green-600 font-bold text-lg">
                  Paid: ₹{item.amountPaid}
                </span>
              </div>

              <div className="text-gray-500 text-sm mt-2">
                Subscribed on:{" "}
                {new Date(item.createdAt).toLocaleDateString()}
              </div>

              <button
                onClick={() => navigate(`/my-courses/${item.courseId?._id}`)}
                className="mt-4 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition active:scale-95"
              >
                Course details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyCourses;
