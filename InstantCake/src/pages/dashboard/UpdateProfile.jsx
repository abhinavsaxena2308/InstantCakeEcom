import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../contexts/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";

const UpdateProfile = () => {
  const { updateUserProfile } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const onSubmit = (data) => {
    const name = data.name;
    const photoURL = data.photoURL;

    updateUserProfile(name, photoURL)
      .then(() => {
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.error("Update error:", error);
      });
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

      {/* Update Profile Card */}
      <div className="relative w-full max-w-md bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-6 sm:p-8 mx-2">

        <h2 className="text-2xl font-bold text-center mb-6 text-white/90">
          Update Your Profile
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div className="form-control w-full">
            <label className="text-white/70 mb-1 rounded px-1">Full Name</label>
            <input
              {...register("name", { required: "Name is required" })}
              type="text"
              placeholder="Your Name"
              className={`w-full bg-white/20 placeholder-white/60 text-white rounded-md p-2 focus:bg-white/30 focus:outline-none focus:ring-2 focus:ring-green-400 ${
                errors.name ? "border-red-500" : ""
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Photo URL */}
          <div className="form-control w-full">
            <label className="text-white/70 mb-1 rounded px-1">Photo URL</label>
            <input
              type="text"
              {...register("photoURL", { required: "Photo URL is required" })}
              placeholder="Paste your photo URL"
              className={`w-full bg-white/20 placeholder-white/60 text-white rounded-md p-2 focus:bg-white/30 focus:outline-none focus:ring-2 focus:ring-green-400 ${
                errors.photoURL ? "border-red-500" : ""
              }`}
            />
            {errors.photoURL && (
              <p className="text-red-500 text-sm">{errors.photoURL.message}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-green hover:bg-[#06402B] text-white font-semibold rounded-md transition"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
