import React from "react";
import bannerImg from "/images/home/banner.png";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();
  const handleOrder = () => {
    navigate(`/menu`);
  };

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 bg-gradient-to-r from-[#FAFAFA] to-[#FCFCFC]">
      <div className="py-24 flex flex-col md:flex-row-reverse items-center justify-between gap-12">

        {/* Banner Image Section */}
        <div className="md:w-1/2 relative">
          <img
            src={bannerImg}
            alt="Delicious Cake Banner"
            className="rounded-3xl shadow-lg hover:scale-105 transition-transform duration-500"
          />

          {/* Floating Cake Cards */}
          <div className="flex flex-col md:flex-row items-center justify-around -mt-14 gap-6">
            
            {/* Card 1 */}
            <div className="card card-side bg-white shadow-lg rounded-2xl w-64 transform hover:-translate-y-2 transition-all duration-300">
              <figure>
                <img
                  src="/images/home/red_velvet.jpg"
                  alt="Red Velvet"
                  className="rounded-l-2xl h-24 w-24 object-cover"
                />
              </figure>
              <div className="card-body p-3 space-y-1">
                <h5 className="font-semibold">Red Velvet</h5>
                <div className="rating rating-sm">
                  <input type="radio" name="rating-1" className="mask mask-star-2 bg-orange-500" readOnly />
                  <input type="radio" name="rating-1" className="mask mask-star-2 bg-orange-500" readOnly />
                  <input type="radio" name="rating-1" className="mask mask-star-2 bg-orange-500" checked readOnly />
                  <input type="radio" name="rating-1" className="mask mask-star-2 bg-orange-400" readOnly />
                  <input type="radio" name="rating-1" className="mask mask-star-2 bg-orange-400" readOnly />
                </div>
                <p className="text-orange-700 font-semibold">₹499.0</p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="card card-side bg-white shadow-lg rounded-2xl w-64 transform hover:-translate-y-2 transition-all duration-300 hidden md:flex">
              <figure>
                <img
                  src="/images/home/black_forest.jpg"
                  alt="Black Forest Cake"
                  className="rounded-l-2xl h-24 w-24 object-cover"
                />
              </figure>
              <div className="card-body p-3 space-y-1">
                <h5 className="font-semibold">Black Forest Cake</h5>
                <div className="rating rating-sm">
                  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-500" readOnly />
                  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-500" readOnly />
                  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-500" checked readOnly />
                  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" readOnly />
                  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" readOnly />
                </div>
                <p className="text-orange-700 font-semibold">₹399.0</p>
              </div>
            </div>
          </div>
        </div>

        {/* Text Section */}
        <div className="md:w-1/2 px-6 space-y-8 text-center md:text-left">
          <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
            Dive into Delights Of Delectable{" "}
            <span className="text-orange-900">Cakes</span>
          </h2>
          <p className="text-[#4A4A4A] text-lg md:text-xl max-w-lg">
            Where each bite tells a story of passion, creativity, and the finest
            ingredients. Our cakes are not just desserts—they are crafted
            experiences that bring people together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-center md:items-start">
            <button
              onClick={handleOrder}
              className="btn bg-orange-900 hover:bg-white hover:text-black btn-outline text-white px-8 py-3 rounded-full font-semibold shadow-md transition-all"
            >
              Order Now
            </button>
            <button className="btn bg-white hover:bg-orange-900 text-black btn-outline px-8 py-3 rounded-full font-semibold">
              Explore Menu
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Banner;
