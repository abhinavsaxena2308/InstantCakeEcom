import React from "react";
import { FaStar } from "react-icons/fa";

const testimonialsData = [
  {
    text: "I ordered a Black Forest cake from InstantCake for my parents’ anniversary, and it was simply perfect! 🎂✨ The cake was super fresh, beautifully decorated, and tasted heavenly. Quick delivery and careful packaging – arrived just like on the website. Definitely my go-to place now for all celebrations!",
    name: "Samantha W.",
    rating: 4.9,
    reviews: "18.6k Reviews",
    avatar: "/images/home/testimonials/testimonial1.png",
  },
  {
    text: "The Red Velvet cake I ordered was absolutely delicious! The flavors were perfect, and the presentation was stunning. Highly recommend InstantCake for any special occasion.",
    name: "James L.",
    rating: 4.8,
    reviews: "12.3k Reviews",
    avatar: "/images/home/testimonials/testimonial2.png",
  },
  {
    text: "InstantCake made my birthday extra special with a personalized chocolate cake. Loved the taste and the prompt delivery. Customer service was friendly and helpful!",
    name: "Priya K.",
    rating: 5.0,
    reviews: "22.1k Reviews",
    avatar: "/images/home/testimonials/testimonial3.png",
  },
];

const Testimonials = () => {
  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 py-20">
      <div className="text-center mb-12 space-y-3">
        <p className="subtitle text-orange-700 uppercase tracking-wide">Testimonials</p>
        <h2 className="title text-3xl md:text-4xl font-bold">
          What Our Customers <span className="text-orange-900">Say About Us</span>
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {testimonialsData.map((item, i) => (
          <div
            key={i}
            className="bg-gray-50 text-orange-900 backdrop-blur-md rounded-xl shadow-lg p-6 hover:shadow-2xl hover:scale-105 transition-transform duration-300 flex flex-col justify-between"
          >
            <blockquote className="text-orange-900 text-base leading-relaxed mb-4">
              "{item.text}"
            </blockquote>
            <div className="flex items-center gap-4 mt-auto">
              <div className="avatar w-14 h-14 rounded-full overflow-hidden border-2 border-white/30">
                <img src={item.avatar} alt={item.name} className="w-full h-full object-cover"/>
              </div>
              <div>
                <h5 className="text-orange-900 font-semibold">{item.name}</h5>
                <div className="flex items-center gap-2 text-sm text-black">
                  <FaStar className="text-yellow-400"/>
                  <span className="font-medium">{item.rating}</span>
                  <span className="text-gray-900">{`(${item.reviews})`}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
