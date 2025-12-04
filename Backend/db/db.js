import mongoose from "mongoose";
import { seedCourses } from "../utils/seedCourses.js";

const connectDb = async ()=>{
    try {
        await mongoose.connect("mongodb+srv://hp14spocox2_db_user:oEWxXFjsTESQlSdo@cluster0.3rkz8zr.mongodb.net/")
        console.log('db conn');
        await seedCourses();
    } catch (error) {
        console.log('db conn fail', error)
    }
}

export default connectDb;


