import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true  // 0 = free
    },
    image: {
        type: String,   
        default: ""
    }
}, { timestamps: true });

export const Course = mongoose.model("Course", courseSchema);
