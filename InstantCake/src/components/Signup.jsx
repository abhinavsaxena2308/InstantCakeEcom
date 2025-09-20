import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { AuthContext } from "../contexts/AuthProvider";
import useAxiosPublic from "../hooks/useAxiosPublic";

const Signup = () => {
  const { createUser, updateUserProfile, signUpWithGmail } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();

  const [signupError, setSignupError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const { register, handleSubmit, formState: { errors } } = useForm();

  // Signup with email & password
  const onSubmit = async (data) => {
    setSignupError(""); // clear previous errors
    try {
      // Create Firebase account
      const result = await createUser(data.email, data.password);

      // Update profile
      await updateUserProfile(data.name, data.photoURL || "");

      // Save user to backend
      await axiosPublic.post("/users", {
        name: data.name,
        email: data.email,
      });

      alert("Signup successful!");
      navigate(from, { replace: true });
    } catch (error) {
      console.error("Signup Error:", error);
      // Show Firebase or Axios error
      setSignupError(error?.response?.data?.message || error.message);
    }
  };

  // Signup with Google
  const handleGoogleSignup = async () => {
    setSignupError("");
    try {
      const result = await signUpWithGmail();
      const userInfo = {
        name: result.user.displayName,
        email: result.user.email,
      };

      await axiosPublic.post("/users", userInfo);

      alert("Signup successful!");
      navigate("/");
    } catch (error) {
      console.error("Google Signup Error:", error);
      setSignupError(error?.response?.data?.message || error.message);
    }
  };

  return (
    <div className="max-w-md bg-white shadow w-full mx-auto flex items-center justify-center my-20">
      <div className="mb-5 w-full">
        <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
          <h3 className="font-bold text-lg">Please Create An Account!</h3>

          {/* Name */}
          <div className="form-control">
            <label className="label"><span className="label-text">Name</span></label>
            <input
              type="text"
              placeholder="Your name"
              className="input input-bordered"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div className="form-control">
            <label className="label"><span className="label-text">Email</span></label>
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div className="form-control">
            <label className="label"><span className="label-text">Password</span></label>
            <input
              type="password"
              placeholder="Password"
              className="input input-bordered"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Password must be at least 6 characters" },
              })}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          {/* Firebase / Backend error */}
          {signupError && <p className="text-red-600 text-sm mt-2">{signupError}</p>}

          {/* Submit button */}
          <div className="form-control mt-6">
            <input type="submit" className="btn bg-green text-white" value="Sign up" />
          </div>

          {/* Login link */}
          <div className="text-center my-2">
            Have an account?
            <Link to="/login">
              <button className="ml-2 underline">Login here</button>
            </Link>
          </div>
        </form>

        {/* Social Signup */}
        <div className="text-center space-x-3 mt-3">
          <button
            onClick={handleGoogleSignup}
            className="btn btn-circle hover:bg-green hover:text-white"
          >
            <FaGoogle />
          </button>
          <button className="btn btn-circle hover:bg-green hover:text-white">
            <FaFacebookF />
          </button>
          <button className="btn btn-circle hover:bg-green hover:text-white">
            <FaGithub />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
