// models/Order.js
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  items: [
    {
      name: String,
      price: Number,
      quantity: Number,
      image: String,
      _id: false,
    },
  ],
  totalAmount: { type: Number, required: true },
  status: { type: String, default: "pending" }, // pending, completed, canceled
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);
