import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const CourseInfo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
  }, [navigate]);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/course/${id}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        setCourse(res.data.course);
      } catch (error) {
        console.log("Error fetching course:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        Loading course details...
      </div>
    );
  }

  if (!course) {
    return (
      <div className="text-center mt-10 text-red-600 text-xl">
        Course not found
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-gray-100 flex flex-col items-center">
      {/* Page Heading */}
      <h2 className="text-4xl font-bold mb-8 text-gray-800">
        Course Details
      </h2>

      <div className="max-w-5xl w-full bg-white rounded-2xl shadow-xl p-6 flex flex-col md:flex-row gap-6">
        {/* Left: Image */}
        <div className="md:w-1/2">
          <img
            src={course.image || "https://via.placeholder.com/500"}
            alt={course.title}
            className="w-full h-64 md:h-full object-cover rounded-xl shadow-md"
          />
        </div>

        {/* Right: Content */}
        <div className="md:w-1/2 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-4">{course.title}</h1>

            <p className="text-gray-700 text-lg mb-4">{course.description}</p>

            {course.detailsInfo && (
              <p className="text-gray-600 text-base mb-4">{course.detailsInfo}</p>
            )}
          </div>

          <div className="mt-4 text-xl font-semibold">
            Price:{" "}
            {course.price === 0 ? (
              <span className="text-green-600 font-bold">Free</span>
            ) : (
              <span className="text-blue-600 font-bold">₹{course.price}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseInfo;
