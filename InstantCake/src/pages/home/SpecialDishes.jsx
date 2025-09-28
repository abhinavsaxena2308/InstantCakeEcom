/* eslint-disable react/prop-types */
import React, { useEffect, useState, useRef } from "react";
import Slider from "react-slick";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import Cards from "../../components/Cards";

// Import slick CSS once
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SpecialDishes = () => {
  const [recipes, setRecipes] = useState([]);
  const slider = useRef(null);

  useEffect(() => {
    fetch("/menu.json")
      .then((res) => res.json())
      .then((data) => {
        const specials = data.filter((item) => item.category === "popular");
        setRecipes(specials);
      })
      .catch((err) => console.error("Error fetching menu.json:", err));
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 700,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3, slidesToScroll: 1 },
      },
      {
        breakpoint: 970,
        settings: { slidesToShow: 2, slidesToScroll: 1 },
      },
      {
        breakpoint: 576,
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
    ],
  };

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 py-20 relative">
      {/* Header */}
      <div className="text-center space-y-4 mb-14">
        <p className="text-orange-700 font-semibold uppercase tracking-wide">
          Handpicked For You
        </p>
        <h2 className="text-3xl md:text-4xl font-bold">
          Our <span className="text-orange-900">Special Dishes</span>
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explore our chef’s most loved creations. These special dishes are
          crafted to delight your taste buds and make every occasion memorable.
        </p>
      </div>

      {/* Custom Navigation Buttons */}
      <div className="md:absolute right-8 top-24 md:mr-20 flex gap-3 justify-center mb-10">
        <button
          onClick={() => slider.current?.slickPrev()}
          className="btn p-3 rounded-full bg-orange-900 text-white hover:bg-orange-700 transition shadow-md"
        >
          <FaAngleLeft className="h-6 w-6" />
        </button>
        <button
          onClick={() => slider.current?.slickNext()}
          className="btn p-3 rounded-full bg-orange-900 text-white hover:bg-orange-700 transition shadow-md"
        >
          <FaAngleRight className="h-6 w-6" />
        </button>
      </div>

      {/* Slider */}
      <Slider
        ref={slider}
        {...settings}
        className="overflow-hidden mt-12 px-2"
      >
        {recipes.map((item, i) => (
          <div
            key={i}
            className="px-3 transition-transform transform hover:scale-105 duration-300"
          >
            <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl p-5 cursor-pointer group">
              <Cards item={item} />
              
            </div>
            
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SpecialDishes;
