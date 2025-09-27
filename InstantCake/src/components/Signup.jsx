import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { AuthContext } from "../contexts/AuthProvider";
import useAxiosPublic from "../hooks/useAxiosPublic";

const Signup = () => {
  const { createUser, updateUserProfile, signInWithProvider } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();

  const [signupError, setSignupError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  // ===== Email / Password Signup =====
  const onSubmit = async (data) => {
    setSignupError("");
    try {
      // Create Firebase account
      const result = await createUser(data.email, data.password);

      // Update profile
      await updateUserProfile(data.name, data.photoURL || "");

      // Save user to backend
      try {
        await axiosPublic.post("/users", { name: data.name, email: data.email });
      } catch (err) {
        if (err.response?.status === 409) {
          console.log("User already exists. Proceeding...");
        } else {
          throw err;
        }
      }

      // Get JWT
      const jwtRes = await axiosPublic.post("/jwt", { email: data.email });
      localStorage.setItem("access-token", jwtRes.data.token);

      alert("Signup successful!");
      reset();
      navigate(from, { replace: true });
    } catch (error) {
      console.error("Signup Error:", error);
      setSignupError(error?.response?.data?.message || error.message);
    }
  };

  // ===== Social Signup/Login Handler =====
  const handleSocialSignup = async (providerName) => {
    setSignupError("");
    try {
      const result = await signInWithProvider(providerName); // 'google', 'facebook', 'github'
      const user = result.user;

      const userInfo = {
        name: user.displayName || `${providerName} User`,
        email: user.email,
      };

      // Create user in backend (idempotent)
      try {
        await axiosPublic.post("/users", userInfo);
      } catch (err) {
        if (err.response?.status === 409) {
          console.log(`${providerName} user already exists. Proceeding...`);
        } else {
          throw err;
        }
      }

      // Get JWT
      const jwtRes = await axiosPublic.post("/jwt", { email: user.email });
      localStorage.setItem("access-token", jwtRes.data.token);

      alert(`${providerName} Signup/Login successful!`);
      navigate(from, { replace: true });
    } catch (error) {
      console.error(`${providerName} Signup Error:`, error);
      setSignupError(`${providerName} Signup/Login failed. Try again.`);
    }
  };

  return (
    <div className="max-w-md bg-white shadow w-full mx-auto flex items-center justify-center my-20">
      <div className="mb-5 w-full">
        <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
          <h3 className="font-bold text-lg mb-4">Create An Account</h3>

          {/* Name */}
          <div className="form-control mb-3">
            <label className="label"><span className="label-text">Name</span></label>
            <input
              type="text"
              placeholder="Your Name"
              className="input input-bordered"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div className="form-control mb-3">
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
          <div className="form-control mb-3">
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

          {/* Backend / Firebase Error */}
          {signupError && <p className="text-red-600 text-sm mt-2">{signupError}</p>}

          {/* Submit */}
          <div className="form-control mt-4">
            <input type="submit" className="btn bg-orange-900 text-white" value="Sign Up" />
          </div>

          <p className="text-center my-2">
            Already have an account?
            <Link to="/login" className="underline ml-1">Login here</Link>
          </p>
        </form>

        {/* Social Signup Buttons */}
        <div className="text-center mt-4 space-x-3">
          <button
            onClick={() => handleSocialSignup("google")}
            className="btn btn-circle hover:bg-orange-900 hover:text-white"
          >
            <FaGoogle />
          </button>
          <button
            onClick={() => handleSocialSignup("facebook")}
            className="btn btn-circle hover:bg-orange-900 hover:text-white"
          >
            <FaFacebookF />
          </button>
          <button
            onClick={() => handleSocialSignup("github")}
            className="btn btn-circle hover:bg-orange-900 hover:text-white"
          >
            <FaGithub />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
