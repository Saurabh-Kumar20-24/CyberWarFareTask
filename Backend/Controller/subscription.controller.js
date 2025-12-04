import { Course } from "../model/course.model.js";
import { Subscription } from "../model/subscription.model.js";

export const subscribeCourse = async (req, res) => {
  try {
    const { courseId, promoCode } = req.body;
    const userId = req.user.id; // From JWT middleware

    if (!courseId) {
      return res.status(400).json({ message: "courseId is required" });
    }

    // 1. Check if course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // 2. Check if already subscribed
    const existing = await Subscription.findOne({ userId, courseId });
    if (existing) {
      return res.status(400).json({ message: "Already subscribed to this course" });
    }

    // 3. Payment Logic
    let amountPaid = course.price;
    let paymentStatus = "unpaid";

    // Apply promo code (PDF defines: BFSale25 → 50% OFF)
    if (promoCode && promoCode.toUpperCase() === "BFSALE25") {
      amountPaid = amountPaid * 0.5;
    }

    // If course is free
    if (course.price === 0) {
      paymentStatus = "paid";   // free course is automatically "paid"
      amountPaid = 0;
    } else {
      paymentStatus = "paid";   // for simplicity, mark as paid (no payment gateway)
    }

    // 4. Create subscription entry
    const subscription = await Subscription.create({
      userId,
      courseId,
      status: "active",
      paymentStatus,
      amountPaid
    });

    return res.status(201).json({
      message: "Course subscribed successfully",
      subscription
    });

  } catch (error) {
    console.error("Subscribe ERROR:", error);
    return res.status(500).json({ message: "Server error" });
  }
};


// -----------------------------
// GET /subscriptions/my-courses
// -----------------------------
export const myCourses = async (req, res) => {
  try {
    const userId = req.user.id;

    const subscriptions = await Subscription.find({ userId })
      .populate("courseId") // populate course details
      .sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Your subscribed courses",
      count: subscriptions.length,
      subscriptions
    });

  } catch (error) {
    console.error("My Courses ERROR:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
