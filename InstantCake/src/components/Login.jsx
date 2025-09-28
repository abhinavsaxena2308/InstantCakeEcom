import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { AuthContext } from "../contexts/AuthProvider";
import useAxiosPublic from "../hooks/useAxiosPublic";

const Login = () => {
  const { login, signUpWithProvider } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();

  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const { register, handleSubmit, reset } = useForm();

  // Email/Password Login
  const onSubmit = async (data) => {
    setLoginError("");
    setLoading(true);
    try {
      const result = await login(data.email, data.password);
      const user = result.user;

      // get jwt token
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

  // Social Login
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
        if (err.response?.status !== 409) throw err; // 409 = already exists
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
    <div className="max-w-md bg-white shadow w-full mx-auto flex items-center justify-center my-20">
      <div className="mb-5 w-full">
        <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
          <h3 className="font-bold text-lg">Please Login</h3>

          {/* Email */}
          <div className="form-control mb-2">
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

          {/* Password */}
          <div className="form-control mb-2">
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

          {loginError && <p className="text-red-600 text-sm mt-2">{loginError}</p>}

          <div className="form-control mt-4">
            <button
              type="submit"
              className="btn bg-green text-white"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>

          <p className="text-center my-2">
            Don’t have an account?
            <Link to="/signup" className="underline text-red ml-1">
              Signup Now
            </Link>
          </p>
        </form>

        {/* Social Login */}
        <div className="text-center space-x-3 mt-3">
          <button
            onClick={() => handleSocialLogin("google")}
            className="btn btn-circle hover:bg-green hover:text-white"
            disabled={loading}
          >
            <FaGoogle />
          </button>
          <button
            onClick={() => handleSocialLogin("facebook")}
            className="btn btn-circle hover:bg-green hover:text-white"
            disabled={loading}
          >
            <FaFacebookF />
          </button>
          <button
            onClick={() => handleSocialLogin("github")}
            className="btn btn-circle hover:bg-green hover:text-white"
            disabled={loading}
          >
            <FaGithub />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;

