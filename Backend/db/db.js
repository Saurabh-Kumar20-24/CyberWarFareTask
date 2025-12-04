import mongoose from "mongoose";
import { seedCourses } from "../utils/seedCourses.js";

const connectDb = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('db conn');
        await seedCourses();
    } catch (error) {
        console.log('db conn fail', error)
    }
}

export default connectDb;


