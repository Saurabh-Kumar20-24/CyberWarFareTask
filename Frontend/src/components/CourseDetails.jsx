import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  const [promo, setPromo] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [discountedPrice, setDiscountedPrice] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
  }, [navigate]);

  // ---------------- Fetch Course by ID ----------------
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

  // ---------------- Apply Promo Code ----------------
  const handleApplyPromo = () => {
    if (promo === "BFSALE25") {
      const newPrice = course.price * 0.5;
      setDiscountedPrice(newPrice);
      setPromoApplied(true);
      toast.success("Promo applied! 50% discount.", { autoClose: 3000 });
    } else {
      toast.error("Invalid promo code", { autoClose: 3000 });
    }
  };

  // ---------------- Subscribe ----------------
  const handleSubscribe = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/subscription/subscribe",
        {
          courseId: course._id,
          promoCode: promoApplied ? "BFSALE25" : "",
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      toast.success("Subscribed successfully!", { autoClose: 3000 });
      setTimeout(() => navigate("/my-courses"), 1500);
    } catch (error) {
      const message = error.response?.data?.message || 'Subscription failed';
      toast.error(message, {autoClose: 3000});
      console.log("Subscription error:", message);
      // console.log("Subscription error:", error.response?.data || error);
      // toast.error("Subscription failed", { autoClose: 3000 });
    }
  };

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
    <div className="min-h-screen p-8 bg-gray-100 flex justify-center">
      <div className="max-w-3xl bg-white shadow-lg rounded-xl p-6">
        <img
          src={course.image || "https://via.placeholder.com/500"}
          alt={course.title}
          className="w-full h-64 object-cover rounded-lg mb-4"
        />

        <h1 className="text-3xl font-bold mb-4">{course.title}</h1>

        <p className="text-gray-700 text-lg mb-4">{course.description}</p>

        <div className="text-xl font-semibold mb-4">
          Price:{" "}
          {course.price === 0 ? (
            <span className="text-green-600 font-bold">Free</span>
          ) : (
            <span className="text-blue-600 font-bold">
              ₹
              {promoApplied
                ? `${discountedPrice} (After Discount)`
                : course.price} <span className="text-gray-500">(PromoCode- BFSALE25)</span>
            </span>
          )}
        </div>

        {/* ---------------- Subscription Logic ---------------- */}

        {course.price === 0 ? (
          <button
            onClick={handleSubscribe}
            className="bg-green-600 w-full py-3 rounded-lg text-white hover:bg-green-700"
          >
            Subscribe (Free)
          </button>
        ) : (
          <>
            <input
              type="text"
              placeholder="Enter Promo Code"
              value={promo}
              onChange={(e) => setPromo(e.target.value)}
              className="border p-2 w-full rounded-lg mb-3"
            />

            <button
              onClick={handleApplyPromo}
              className="bg-yellow-500 w-full py-2 rounded-lg text-white hover:bg-yellow-600 mb-3"
            >
              Apply Promo Code
            </button>

            <button
              onClick={handleSubscribe}
              disabled={!promoApplied}
              className={`w-full py-3 rounded-lg text-white ${
                promoApplied
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Subscribe Now
            </button>
          </>
        )}
      </div>

      {/* Toast Container */}
      <ToastContainer position="top-right" />
    </div>
  );
};

export default CourseDetail;
