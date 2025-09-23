import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaDollarSign, FaUsers, FaUtensils, FaShoppingCart } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Dashboard = () => {
  const { user } = useAuth("");
    const axiosSecure = useAxiosSecure("");
  const [stats, setStats] = useState({
    revenue: 0,
    users: 0,
    menuItems: 0,
    orders: 0,
  });
  // Fetch all orders/payments
    const { data: orders = [] } = useQuery({
      queryKey: ["orders", user?.email],
      enabled: !!user?.email,
      queryFn: async () => {
        const res = await axiosSecure.get(`/payments?email=${user.email}`);
        return res.data;
      },
    });
  
    // Fetch cart items
    const { data: cart = [] } = useQuery({
      queryKey: ["cart", user?.email],
      enabled: !!user?.email,
      queryFn: async () => {
        const res = await axiosSecure.get(`/carts?email=${user.email}`);
        return res.data;
      },
    });
  
    // Compute totals
    const totalOrders = orders.length;
    const totalCartItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    const totalSpent = orders.reduce((acc, order) => acc + order.price, 0);
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("access-token"); // JWT token
        const res = await axios.get("https://node-backend-hj5m.onrender.com//api/dashboard-stats", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats(res.data);
      } catch (err) {
        console.error("Failed to fetch dashboard stats:", err);
      }
    };

    fetchStats();
  }, []);

  const cards = [
    { title: "Total Revenue", value: `$${totalSpent.toFixed(2)}`, icon: <FaDollarSign className="text-5xl text-green" /> },
    { title: "Total Users", value: stats.users, icon: <FaUsers className="text-5xl text-blue-500" /> },
    { title: "Menu Items", value: stats.menuItems, icon: <FaUtensils className="text-5xl text-yellow-500" /> },
    { title: "Total Orders", value: totalOrders, icon: <FaShoppingCart className="text-5xl text-red-500" /> },
  ];

  return (
    <div className="max-w-screen-2xl container mx-auto px-4 py-12">
      <h2 className="text-2xl font-semibold mb-8">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {cards.map((card, index) => (
          <div key={index} className="flex items-center p-6 bg- shadow-md rounded-lg space-x-4">
            <div>{card.icon}</div>
            <div>
              <p className="text-sm text-gray-500">{card.title}</p>
              <p className="text-2xl font-bold">{card.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
