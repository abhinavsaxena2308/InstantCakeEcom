const express = require("express");
const app = express();
const cors = require("cors");
const port = 3000;
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// middleware
app.use(
  cors());
app.use(express.json());

// mongodb configuration using mongoose
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected Successfully!"))
  .catch((error) => console.log("Error connecting to MongoDB", error));

// jwt authentication
app.post("/jwt", async (req, res) => {
  const user = req.body;
  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1h", // ✅ fixed typo
  });
  res.send({ token });
});

// import routes here
const menuRoutes = require("./api/routes/menuRoutes");
const cartRoutes = require("./api/routes/cartRoutes");
const userRoutes = require("./api/routes/userRoutes");
const paymentRoutes = require("./api/routes/paymentRoutes");
const dashboardRoutes = require("./api/routes/dashboardRoutes");

app.use("/api", dashboardRoutes);
app.use("/menu", menuRoutes);
app.use("/carts", cartRoutes);
app.use("/users", userRoutes); // ✅ all user logic handled in userControllers.js
app.use("/payments", paymentRoutes);

// stripe payments route
app.post("/create-payment-intent", async (req, res) => {
  const { price } = req.body;
  const amount = price * 100;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      payment_method_types: ["card"],
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/", (req, res) => {
  res.send("Hello Foodi Client Server!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
