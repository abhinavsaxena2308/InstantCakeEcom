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

  // Email/Password Signup
  const onSubmit = async (data) => {
    setSignupError("");
    setLoading(true);
    try {
      const result = await createUser(data.email, data.password);
      const user = result.user;

      await updateUserProfile( data.name );

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

  // Social Signup/Login
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
    <div className="max-w-md bg-white shadow w-full mx-auto flex items-center justify-center my-20">
      <div className="mb-5 w-full">
        <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
          <h3 className="font-bold text-lg">Create an Account</h3>

          {/* Name */}
          <div className="form-control mb-2">
            <label className="label"><span className="label-text">Full Name</span></label>
            <input
              type="text"
              placeholder="Your Name"
              className={`input input-bordered ${errors.name ? "border-red-500" : ""}`}
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && <p className="text-red text-sm">{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div className="form-control mb-2">
            <label className="label"><span className="label-text">Email</span></label>
            <input
              type="email"
              placeholder="Email"
              className={`input input-bordered ${errors.email ? "border-red-500" : ""}`}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && <p className="text-red text-sm">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div className="form-control mb-2">
            <label className="label"><span className="label-text">Password</span></label>
            <input
              type="password"
              placeholder="Password"
              className={`input input-bordered ${errors.password ? "border-red-500" : ""}`}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {errors.password && <p className="text-red text-sm">{errors.password.message}</p>}
          </div>

          {/* Confirm Password */}
          <div className="form-control mb-2">
            <label className="label"><span className="label-text">Confirm Password</span></label>
            <input
              type="password"
              placeholder="Confirm Password"
              className={`input input-bordered ${errors.confirmPassword ? "border-red-500" : ""}`}
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) => value === password || "Passwords do not match",
              })}
            />
            {errors.confirmPassword && <p className="text-red text-sm">{errors.confirmPassword.message}</p>}
          </div>

          {signupError && <p className="text-red-600 text-sm mt-2">{signupError}</p>}

          <div className="form-control mt-4">
            <button type="submit" className="btn bg-green text-white" disabled={loading}>
              {loading ? "Signing up..." : "Signup"}
            </button>
          </div>

          <p className="text-center my-2">
            Already have an account?
            <Link to="/login" className="underline text-red ml-1">Login Here</Link>
          </p>
        </form>

        {/* Social Signup/Login */}
        <div className="text-center space-x-3 mt-3">
          <button onClick={() => handleSocialSignup("google")} className="btn btn-circle hover:bg-green hover:text-white" disabled={loading}><FaGoogle /></button>
          <button onClick={() => handleSocialSignup("facebook")} className="btn btn-circle hover:bg-green hover:text-white" disabled={loading}><FaFacebookF /></button>
          <button onClick={() => handleSocialSignup("github")} className="btn btn-circle hover:bg-green hover:text-white" disabled={loading}><FaGithub /></button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
