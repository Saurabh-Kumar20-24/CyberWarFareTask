import express from "express";
import { Authenticated } from "../middleware/auth.js";
import { subscribeCourse, myCourses } from "../Controller/subscription.controller.js";

const router = express.Router();


router.post("/subscribe", Authenticated, subscribeCourse);

router.get("/my-courses", Authenticated, myCourses);

// router.get("/my-courses/:id", Authenticated, myCourses);


export default router;
