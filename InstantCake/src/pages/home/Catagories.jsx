import React from "react";

const categoryItems = [
  {
    id: 1,
    title: "Main Dish",
    description: "(86 dishes)",
    image: "/images/home/category/img1.png",
    bg: "from-pink-100 to-pink-200",
  },
  {
    id: 2,
    title: "Breakfast",
    description: "(12 breakfast)",
    image: "/images/home/category/img2.png",
    bg: "from-yellow-100 to-yellow-200",
  },
  {
    id: 3,
    title: "Dessert",
    description: "(48 desserts)",
    image: "/images/home/category/img3.png",
    bg: "from-purple-100 to-purple-200",
  },
  {
    id: 4,
    title: "Browse All",
    description: "(255 items)",
    image: "/images/home/category/img4.png",
    bg: "from-green-100 to-green-200",
  },
];

const Categories = () => {
  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 py-20">
      {/* Header */}
      <div className="text-center space-y-4 mb-14">
        <p className="text-orange-700 font-semibold uppercase tracking-wide">
          Customer Favorites
        </p>
        <h2 className="text-3xl md:text-4xl font-bold">
          Popular <span className="text-orange-900">Categories</span>
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explore our wide range of dishes across different categories. From
          hearty main courses to sweet indulgences, we have something for
          everyone.
        </p>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {categoryItems.map((item) => (
          <div
            key={item.id}
            className="group shadow-lg rounded-2xl bg-white py-10 px-6 text-center cursor-pointer hover:-translate-y-3 transition-all duration-300 hover:shadow-2xl"
          >
            <div
              className={`w-28 h-28 mx-auto rounded-full p-6 flex items-center justify-center bg-gradient-to-br ${item.bg} shadow-md group-hover:scale-110 transition-transform duration-300`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-16 h-16 object-contain"
              />
            </div>
            <div className="mt-6 space-y-2">
              <h5 className="text-lg font-semibold text-gray-800 group-hover:text-orange-900 transition-colors">
                {item.title}
              </h5>
              <p className="text-gray-500 text-sm">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
