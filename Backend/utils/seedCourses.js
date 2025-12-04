import { Course } from "../model/course.model.js";

export const seedCourses = async () => {
  const existing = await Course.countDocuments();
  if (existing > 0) {
    console.log("Courses already seeded");
    return;
  }
  

  const courses = [
    {
      title: "React for Beginners",
      description: "Learn basics of React including components and hooks.",
      price: 0,
      image: "https://via.placeholder.com/300x200?text=React"
    },
    {
      title: "Node.js Masterclass",
      description: "Build backend APIs with Node.js and Express.",
      price: 499,
      image: "https://via.placeholder.com/300x200?text=Node"
    },
    {
      title: "MongoDB Bootcamp",
      description: "Master NoSQL database concepts with MongoDB.",
      price: 399,
      image: "https://via.placeholder.com/300x200?text=MongoDB"
    },
    {
      title: "JavaScript Essentials",
      description: "Learn core JavaScript concepts from scratch.",
      price: 0,
      image: "https://via.placeholder.com/300x200?text=JavaScript"
    },
    {
      title: "Fullstack Web Developer",
      description: "Become a MERN stack fullstack developer.",
      price: 999,
      image: "https://via.placeholder.com/300x200?text=Fullstack"
    }
  ];

  await Course.insertMany(courses);
  console.log("Courses seeded successfully!");
};
