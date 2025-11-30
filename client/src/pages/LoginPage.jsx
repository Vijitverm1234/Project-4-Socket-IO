import React, { useState } from "react";
import assets from "../assests/assets";

const LoginPage = () => {
  const [curr, setCurr] = useState("Sign-Up");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);

  // Toggle Login / Signup
  const toggleForm = () => {
    setCurr(curr === "Sign-Up" ? "Login" : "Sign-Up");
  };

  return (
    <div className="min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl">
      <img src={assets.logo_big} alt="" className="w-[min(30vw,250px)]" />

      <form className="border-2 bg-white/10 text-white border-gray-500 p-6 flex flex-col gap-6 shadow-lg rounded-lg min-w-[300px] w-[350px]">
        <h2 className="font-medium text-2xl flex justify-between items-center">
          {curr}
          <img
            src={assets.arrow_icon}
            className="w-5 cursor-pointer"
            alt=""
            onClick={toggleForm}
          />
        </h2>

        {curr === "Sign-Up" && (
          <input
            type="text"
            className="p-2 border border-gray-500 bg-transparent rounded-md focus:outline-none"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        )}

        <input
          type="email"
          className="p-2 border border-gray-500 bg-transparent rounded-md focus:outline-none"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          className="p-2 border border-gray-500 bg-transparent rounded-md focus:outline-none"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {curr === "Sign-Up" && (
          <textarea
            className="p-2 border border-gray-500 bg-transparent rounded-md focus:outline-none"
            placeholder="Bio (Optional)"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          ></textarea>
        )}

        <button className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-2 rounded-md font-medium">
          {curr === "Sign-Up" ? "Create Account" : "Login"}
        </button>
        <p
          className="text-sm text-gray-300 text-center cursor-pointer hover:underline"
          onClick={() => setCurr(curr === "Sign-Up" ? "Login" : "Sign-Up")}
        >
          {curr === "Sign-Up"
            ? "Already have an account? Login"
            : "Don't have an account? Sign-Up"}
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
