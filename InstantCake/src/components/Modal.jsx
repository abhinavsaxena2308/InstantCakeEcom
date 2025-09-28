import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { AuthContext } from "../contexts/AuthProvider";
import useAxiosPublic from "../hooks/useAxiosPublic";

const Modal = () => {
  const { login, signUpWithProvider } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();

  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // ======= Email / Password Login =======
  const onSubmit = async (data) => {
    setErrorMessage("");
    try {
      const result = await login(data.email, data.password);
      const user = result.user;
      const userInfo = {
        name: user.displayName || "User",
        email: data.email,
      };

      try {
        await axiosPublic.post("/users", userInfo);
      } catch (err) {
        if (err.response?.status !== 409) throw err;
      }

      const jwtRes = await axiosPublic.post("/jwt", { email: user.email });
      localStorage.setItem("access-token", jwtRes.data.token);

      navigate(from, { replace: true });
      reset();
      document.getElementById("my_modal_5").close();
    } catch (error) {
      console.error(error);
      setErrorMessage("Please provide valid email & password!");
    }
  };

  // ======= Social Login Handler =======
  const handleSocialLogin = async (providerName) => {
    setErrorMessage("");
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
      document.getElementById("my_modal_5").close();
    } catch (error) {
      console.error(`${providerName} login error:`, error);
      setErrorMessage(`${providerName} login failed. Try again.`);
    }
  };

  return (
    <dialog id="my_modal_5" className="modal modal-middle sm:modal-middle">
      {" "}
      <div className="modal-box">
        {" "}
        <div className="modal-action flex-col justify-center mt-0">
          {" "}
          <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
            {" "}
            <h3 className="font-bold text-lg mb-2">Please Login!</h3>
            {/* Email */}
            <div className="form-control mb-2">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Email"
                className={`input input-bordered ${
                  errors.email ? "border-red-500" : ""
                }`}
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="text-red-500 text-xs italic mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            {/* Password */}
            <div className="form-control mb-2">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Password"
                className={`input input-bordered ${
                  errors.password ? "border-red-500" : ""
                }`}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              {errors.password && (
                <p className="text-red-500 text-xs italic mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
            {/* Errors */}
            {errorMessage && (
              <p className="text-red-500 text-xs italic mb-2">{errorMessage}</p>
            )}
            {/* Submit */}
            <div className="form-control mt-2">
              <input
                type="submit"
                className="btn bg-green text-white"
                value="Login"
              />
            </div>
            <p className="text-center my-2">
              Don’t have an account?
              <Link to="/signup" className="underline text-red ml-1">
                Signup Now
              </Link>
            </p>
          </form>
          {/* Social Login */}
          <div className="text-center space-x-3 mb-5 mt-3">
            <button
              onClick={() => handleSocialLogin("google")}
              className="btn btn-circle hover:bg-green hover:text-white"
            >
              <FaGoogle />
            </button>
            <button
              onClick={() => handleSocialLogin("facebook")}
              className="btn btn-circle hover:bg-green hover:text-white"
            >
              <FaFacebookF />
            </button>
            <button
              onClick={() => handleSocialLogin("github")}
              className="btn btn-circle hover:bg-green hover:text-white"
            >
              <FaGithub />
            </button>
          </div>
          {/* Close modal */}
          <div
            htmlFor="my_modal_5"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={() => document.getElementById("my_modal_5").close()}
          >
            ✕
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default Modal;
