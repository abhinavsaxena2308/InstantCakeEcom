const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const Order = require("../models/Order");
const User = require("../models/User");
const MenuItem = require("../models/Menu");

// GET /api/dashboard-stats
router.get("/dashboard-stats", verifyToken, async (req, res) => {
  try {
    // Total Revenue
    const orders = await Order.find({});
    const totalRevenue = orders.reduce((acc, order) => acc + order.totalAmount, 0);

    // Total Users
    const usersCount = await User.countDocuments();

    // Total Menu Items
    const menuItemsCount = await MenuItem.countDocuments();

    // Total Orders
    const ordersCount = orders.length;

    res.json({
      revenue: totalRevenue.toFixed(2),
      users: usersCount,
      menuItems: menuItemsCount,
      orders: ordersCount,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch dashboard stats" });
  }
});

module.exports = router;
