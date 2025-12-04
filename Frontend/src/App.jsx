import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home";
import CourseDetails from "./components/CourseDetails";
import MyCourses from "./components/Mycourses";
import Navbar from "./components/Navbar";
import CourseInfo from "./components/CourseInfo";


function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/course/:id" element={<CourseDetails />} />
        <Route path="/my-courses" element={<MyCourses />} />
        <Route path="/my-courses/:id" element={<CourseInfo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
