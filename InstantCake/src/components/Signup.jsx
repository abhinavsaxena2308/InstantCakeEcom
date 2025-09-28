import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { AuthContext } from "../contexts/AuthProvider";
import useAxiosPublic from "../hooks/useAxiosPublic";

const Signup = () => {
  const { createUser, signUpWithProvider, updateUserProfile } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();

  const [signupError, setSignupError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {
    setSignupError("");
    setLoading(true);
    try {
      const result = await createUser(data.email, data.password);
      const user = result.user;

      await updateUserProfile(data.name);

      const userInfo = { name: data.name, email: user.email };
      await axiosPublic.post("/users", userInfo);

      const jwtRes = await axiosPublic.post("/jwt", { email: user.email });
      localStorage.setItem("access-token", jwtRes.data.token);

      alert("Signup successful!");
      navigate(from, { replace: true });
      reset();
    } catch (error) {
      console.error("Signup Error:", error);
      if (error.code === "auth/email-already-in-use") {
        alert("Email already registered. Redirecting to login.");
        navigate("/login");
      } else {
        setSignupError(error.message || "Signup failed. Try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignup = async (providerName) => {
    setSignupError("");
    setLoading(true);
    try {
      const result = await signUpWithProvider(providerName);
      const user = result.user;

      const userInfo = {
        name: user.displayName || `${providerName} User`,
        email: user.email,
      };

      try {
        await axiosPublic.post("/users", userInfo);
      } catch (err) {
        if (err.response?.status !== 409) throw err;
      }

      const jwtRes = await axiosPublic.post("/jwt", { email: user.email });
      localStorage.setItem("access-token", jwtRes.data.token);

      alert("Signup successful!");
      navigate(from, { replace: true });
    } catch (error) {
      console.error(`${providerName} signup error:`, error);
      setSignupError(`${providerName} signup failed. Try again.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative px-4"
      style={{
        backgroundImage: `url(https://t4.ftcdn.net/jpg/07/31/41/51/360_F_731415137_MNIKKfV25oErO1BS3zCU3I2eKioHW8W6.jpg)`,
      }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60"></div>

      {/* Signup Form */}
      <div className="relative w-full max-w-md bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-6 sm:p-8 mx-2">
        
        

        <h2 className="text-2xl font-bold text-center mb-6 text-white/90">Create an Account</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Full Name */}
          <div className="form-control w-full">
            <label className="text-white/70 mb-1 rounded px-1">Full Name</label>
            <input
              type="text"
              placeholder="Your Name"
              className={`input w-full bg-white/20 placeholder-white/60 text-white rounded-md p-2 focus:bg-white/30 focus:outline-none focus:ring-2 focus:ring-green-400 ${errors.name ? "border-red-500" : ""}`}
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div className="form-control w-full">
            <label className="text-white/70 mb-1 rounded px-1">Email</label>
            <input
              type="email"
              placeholder="Email"
              className={`input w-full bg-white/20 placeholder-white/60 text-white rounded-md p-2 focus:bg-white/30 focus:outline-none focus:ring-2 focus:ring-green-400 ${errors.email ? "border-red-500" : ""}`}
              {...register("email", {
                required: "Email is required",
                pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" },
              })}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div className="form-control w-full">
            <label className="text-white/70 mb-1 rounded px-1">Password</label>
            <input
              type="password"
              placeholder="Password"
              className={`input w-full bg-white/20 placeholder-white/60 text-white rounded-md p-2 focus:bg-white/30 focus:outline-none focus:ring-2 focus:ring-green-400 ${errors.password ? "border-red-500" : ""}`}
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Password must be at least 6 characters" },
              })}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          {/* Confirm Password */}
          <div className="form-control w-full">
            <label className="text-white/70 mb-1 rounded px-1">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm Password"
              className={`input w-full bg-white/20 placeholder-white/60 text-white rounded-md p-2 focus:bg-white/30 focus:outline-none focus:ring-2 focus:ring-green-400 ${errors.confirmPassword ? "border-red-500" : ""}`}
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) => value === password || "Passwords do not match",
              })}
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
          </div>

          {signupError && <p className="text-red-500 text-sm">{signupError}</p>}

          {/* Signup Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-green hover:bg-[#06402B] text-white font-semibold rounded-md transition"
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        {/* Separator */}
        <div className="flex items-center my-4 text-white/80">
          <hr className="flex-grow border-white/50" />
          <span className="px-2 text-sm">— Or Sign Up With —</span>
          <hr className="flex-grow border-white/50" />
        </div>

        {/* Social Signup/Login Buttons */}
        <div className="flex flex-col sm:flex-row justify-between gap-3">
          <button
            onClick={() => handleSocialSignup("google")}
            className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-red hover:bg-orange-700 text-white rounded-md transition"
            disabled={loading}
          >
            <FaGoogle />
            Google
          </button>
          <button
            onClick={() => handleSocialSignup("facebook")}
            className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-blue-600/80 hover:bg-blue-600 text-white rounded-md transition"
            disabled={loading}
          >
            <FaFacebookF />
            Facebook
          </button>
          <button
            onClick={() => handleSocialSignup("github")}
            className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-black/70 hover:bg-black text-white rounded-md transition"
            disabled={loading}
          >
            <FaGithub />
            GitHub
          </button>
        </div>

        {/* Login Link */}
        <p className="text-center mt-4 text-white/80 text-sm">
          Already have an account?
          <Link to="/login" className="underline text-green-400 ml-1">
            Login Here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
