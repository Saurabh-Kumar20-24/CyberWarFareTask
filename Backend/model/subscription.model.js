import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true
  },
  status: {
    type: String,
    enum: ["active", "expired"],
    default: "active"
  },
  paymentStatus: {
    type: String,
    enum: ["paid", "unpaid"],
    default: "unpaid"
  },
  paymentId: {
    type: String,
    default: null
  },
  amountPaid: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

export const Subscription = mongoose.model("Subscription", subscriptionSchema);
