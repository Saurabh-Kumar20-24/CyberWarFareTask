import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";


export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [passError, setPassError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [showPassword, setShowPassword] = useState(false)

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("https://cyber-war-fare-task-zuaj.vercel.app/auth/signup", form);
      toast.success("Signup successful! Please login.", { autoClose: 3000 });
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      console.log("signup error",err)
      toast.error(err.response?.data?.message || "Signup failed", {
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Signup
        </h2>

        <form onSubmit={handleSignup} className="flex flex-col gap-4">
          <input
            type="text"
            required
            placeholder="Name"
            minLength={3}
            maxLength={30}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="email"
            required
            placeholder="Email"
            value={form.email}
            onChange={(e) =>{
              const value = e.target.value;
              setForm({ ...form, email: value })
              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
              if(!emailRegex.test(value)){
                setEmailError("Please enter valid email.")
              }else{
                setEmailError("");
              }
            }}
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}

          <div className="relative">
            <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={form.password}
            required
            onChange={(e) => {
              const value = e.target.value;
              setForm({ ...form, password: value });
              const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
              if(!passwordRegex.test(value)){
                setPassError("Password must contain: 1 uppercase, 1 lowercase, 1 special character, and be at least 8 characters long.")
              }else{
                setPassError("");
              }
            }}
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-3 flex items-center"
          >
            {showPassword ? (
              <EyeSlashIcon className="h-5 w-5 text-gray-600" />
            ) : (
              <EyeIcon className="h-5 w-5 text-gray-600" />
            )}
          </button>
          </div>

          {passError && (
            <p className="text-red-500 text-sm mt-1">{passError}</p>
          )}

          <button
            type="submit"
            className="bg-blue-600 text-white py-3 rounded-lg text-lg hover:bg-blue-700 transition-all"
          >
            Signup
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
