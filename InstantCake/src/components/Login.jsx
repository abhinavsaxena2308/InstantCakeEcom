import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { AuthContext } from "../contexts/AuthProvider";
import useAxiosPublic from "../hooks/useAxiosPublic";
import logo from "/logo.png"; // <-- Your logo

const Login = () => {
  const { login, signUpWithProvider } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();

  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    setLoginError("");
    setLoading(true);
    try {
      const result = await login(data.email, data.password);
      const user = result.user;

      const jwtRes = await axiosPublic.post("/jwt", { email: user.email });
      localStorage.setItem("access-token", jwtRes.data.token);

      navigate(from, { replace: true });
      reset();
    } catch (error) {
      console.error("Login Error:", error);
      if (error.code === "auth/user-not-found") {
        alert("Account does not exist. Please signup first.");
        navigate("/signup");
      } else {
        setLoginError("Invalid email or password. Try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (providerName) => {
    setLoginError("");
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

      navigate(from, { replace: true });
    } catch (error) {
      console.error(`${providerName} login error:`, error);
      setLoginError(`${providerName} login failed. Try again.`);
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

      {/* Login Form */}
      <div className="relative w-full max-w-md bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-6 sm:p-8 mx-2">
        

        <h2 className="text-2xl font-bold text-center mb-6 text-white/90">Have an account?</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email/Username */}
          <div className="form-control w-full">
            <label className="text-white/70 mb-1 rounded px-1">Username or Email</label>
            <input
              type="text"
              placeholder="Enter your username or email"
              className="input w-full bg-white/20 placeholder-white/60 text-white rounded-md p-2 focus:bg-white/30 focus:outline-none focus:ring-2 focus:ring-green-400"
              {...register("email", { required: true })}
            />
          </div>

          {/* Password */}
          <div className="form-control w-full">
            <label className="text-white/70 mb-1 rounded px-1">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="input w-full bg-white/20 placeholder-white/60 text-white rounded-md p-2 focus:bg-white/30 focus:outline-none focus:ring-2 focus:ring-green-400"
              {...register("password", { required: true })}
            />
          </div>

          {/* Remember Me */}
          <div className="flex flex-col sm:flex-row items-center justify-between text-sm text-white/80">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="checkbox" />
              <span>Remember Me</span>
            </label>
          </div>

          {loginError && <p className="text-red-500 text-sm">{loginError}</p>}

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-green hover:bg-[#06402B] text-white font-semibold rounded-md transition"
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        {/* Separator */}
        <div className="flex items-center my-4 text-white/80">
          <hr className="flex-grow border-white/50" />
          <span className="px-2 text-sm">— Or Sign In With —</span>
          <hr className="flex-grow border-white/50" />
        </div>

        {/* Social Login Buttons */}
        <div className="flex flex-col sm:flex-row justify-between gap-3">
          <button
            onClick={() => handleSocialLogin("google")}
            className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-red hover:bg-orange-700 text-white rounded-md transition"
            disabled={loading}
          >
            <FaGoogle />
            Google
          </button>
          <button
            onClick={() => handleSocialLogin("facebook")}
            className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-blue-600/80 hover:bg-blue-600 text-white rounded-md transition"
            disabled={loading}
          >
            <FaFacebookF />
            Facebook
          </button>
          <button
            onClick={() => handleSocialLogin("github")}
            className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-black/70 hover:bg-black text-white rounded-md transition"
            disabled={loading}
          >
            <FaGithub />
            GitHub
          </button>
        </div>

        {/* Signup link */}
        <p className="text-center mt-4 text-white/80 text-sm">
          Don’t have an account?
          <Link to="/signup" className="underline text-green-400 ml-1">
            Signup Now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
