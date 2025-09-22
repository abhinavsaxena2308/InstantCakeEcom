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
    dots: true,
    infinite: false,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 970,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 my-20 relative">
      <div className="text-left">
        <p className="subtitle">Customer Favorites</p>
        <h2 className="title">Popular Categories</h2>
      </div>

      {/* Custom Navigation Buttons */}
      <div className="md:absolute right-3 top-8 mb-10 md:mr-24 flex gap-2">
        <button
          onClick={() => slider.current?.slickPrev()}
          className="btn p-2 rounded-full bg-orange-900 text-white hover:bg-orange-700 transition"
        >
          <FaAngleLeft className="h-8 w-8 p-1" />
        </button>
        <button
          onClick={() => slider.current?.slickNext()}
          className="btn p-2 rounded-full bg-orange-900 text-white hover:bg-orange-700 transition"
        >
          <FaAngleRight className="h-8 w-8 p-1" />
        </button>
      </div>

      <Slider ref={slider} {...settings} className="overflow-hidden mt-10 space-x-5">
        {recipes.map((item, i) => (
          <Cards item={item} key={i} />
        ))}
      </Slider>
    </div>
  );
};

export default SpecialDishes;
