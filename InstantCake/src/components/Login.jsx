import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const { login, signInWithProvider } = useAuth(); // unified social login
  const axiosSecure = useAxiosSecure();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const { register, handleSubmit, reset } = useForm();

  // ======= Email / Password Login =======
  const onSubmit = async (data) => {
    setErrorMessage("");
    try {
      const result = await login(data.email, data.password);
      const user = result.user;

      const userInfo = {
        name: data.name || user.displayName || "User",
        email: data.email,
      };

      // Idempotent: create user if not exists
      await axiosSecure.post("/users", userInfo);

      // Fetch JWT
      const jwtRes = await axiosSecure.post("/jwt", { email: user.email });
      localStorage.setItem("access-token", jwtRes.data.token);

      navigate(from, { replace: true });
      reset();
    } catch (error) {
      if (error.response?.status === 409) {
        // User already exists: just get JWT
        const jwtRes = await axiosSecure.post("/jwt", { email: data.email });
        localStorage.setItem("access-token", jwtRes.data.token);
        navigate(from, { replace: true });
      } else {
        setErrorMessage("Something went wrong. Try again.");
        console.error(error);
      }
    }
  };

  // ======= Social Login Handler =======
  const handleSocialLogin = async (providerName) => {
    setErrorMessage("");
    try {
      const result = await signInWithProvider(providerName); // google, facebook, github
      const user = result.user;

      const userInfo = {
        name: user.displayName || `${providerName} User`,
        email: user.email,
      };

      // Idempotent: create user if not exists
      await axiosSecure.post("/users", userInfo);

      // Fetch JWT
      const jwtRes = await axiosSecure.post("/jwt", { email: user.email });
      localStorage.setItem("access-token", jwtRes.data.token);

      navigate(from, { replace: true });
    } catch (error) {
      console.error(`${providerName} login error:`, error);
      setErrorMessage(`${providerName} login failed. Try again.`);
    }
  };

  return (
    <div className="max-w-md bg-white shadow w-full mx-auto flex items-center justify-center my-20">
      <div className="mb-5 w-full">
        <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
          <h3 className="font-bold text-lg mb-4">Please Login!</h3>

          <div className="form-control mb-3">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered"
              {...register("email", { required: true })}
            />
          </div>

          <div className="form-control mb-3">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Password"
              className="input input-bordered"
              {...register("password", { required: true })}
            />
          </div>

          {errorMessage && (
            <p className="text-red-500 text-xs italic mb-2">{errorMessage}</p>
          )}

          <div className="form-control mt-4">
            <input
              type="submit"
              className="btn bg-orange-900 text-white"
              value="Login"
            />
          </div>

          <p className="text-center my-2">
            Don’t have an account?{" "}
            <Link to="/signup" className="underline text-red ml-1">
              Signup Now
            </Link>
          </p>
        </form>

        {/* Social Login Buttons */}
        <div className="text-center mt-4 space-x-3">
          <button
            onClick={() => handleSocialLogin("google")}
            className="btn btn-circle hover:bg-orange-900 hover:text-white"
          >
            <FaGoogle />
          </button>
          <button
            onClick={() => handleSocialLogin("facebook")}
            className="btn btn-circle hover:bg-orange-900 hover:text-white"
          >
            <FaFacebookF />
          </button>
          <button
            onClick={() => handleSocialLogin("github")}
            className="btn btn-circle hover:bg-orange-900 hover:text-white"
          >
            <FaGithub />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
