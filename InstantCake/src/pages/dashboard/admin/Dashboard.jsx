import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaDollarSign, FaUsers, FaUtensils, FaShoppingCart } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import CountUp from "react-countup";
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

  // Fetch orders/payments
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

  // Fetch global stats
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("access-token");
        const res = await axios.get("https://node-backend-hj5m.onrender.com/api/dashboard-stats", {
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
    { title: "Total Revenue", value: totalSpent.toFixed(2), icon: <FaDollarSign className="text-5xl text-green" />, prefix: "$" },
    { title: "Total Users", value: stats.users, icon: <FaUsers className="text-5xl text-blue-500" /> },
    { title: "Menu Items", value: stats.menuItems, icon: <FaUtensils className="text-5xl text-yellow-500" /> },
    { title: "Total Orders", value: totalOrders, icon: <FaShoppingCart className="text-5xl text-red-500" /> },
  ];

  // Chart data
  const ordersChartData = orders.map((order, idx) => ({
    name: `Order ${idx + 1}`,
    price: order.price,
  }));

  const pieData = [
    { name: "Orders", value: totalOrders },
    { name: "Cart Items", value: totalCartItems },
    { name: "Menu Items", value: stats.menuItems },
  ];

  const COLORS = ["#FF8042", "#0088FE", "#00C49F"];

  return (
    <div className="max-w-screen-2xl container mx-auto px-4 py-12 space-y-10">
      <h2 className="text-2xl font-semibold mb-8">Dashboard</h2>

      {/* Stats Cards with CountUp */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {cards.map((card, index) => (
          <div key={index} className="flex items-center p-6 bg-white rounded-lg shadow-md space-x-4 hover:shadow-xl transition duration-300">
            <div>{card.icon}</div>
            <div>
              <p className="text-sm text-gray-500">{card.title}</p>
              <p className="text-2xl font-bold">
                <CountUp end={card.value} duration={1.5} separator="," prefix={card.prefix || ""} />
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Orders Bar Chart */}
        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
          <h3 className="text-xl font-semibold mb-4">Orders Revenue</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={ordersChartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="price" fill="#FF8042" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
          <h3 className="text-xl font-semibold mb-4">Summary</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
