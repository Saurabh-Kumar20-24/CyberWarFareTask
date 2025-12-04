import { Course } from "../model/course.model.js"

export const getAllCourses = async (req,res)=>{
    try {
        const courses = await Course.find();
        if(!courses){
            return res.status(400).json({message: "unable to fetch courses"})
        }
       return res.status(200).json({message: "all courses", courses})
    } catch (error) {
        return res.status(500).json({message: "server error in course"})
    }
}


export const courseById = async (req,res)=>{
    try {
        const id = req.params.id;
        const course = await Course.findById(id);
        if(!course){
            return res.status(400).json({message: "invalid course id"})
        }
       return res.status(200).json({message: "course find successfully", course})
    } catch (error) {
        return res.status(500).json({message: "server error in course"})
    }
}