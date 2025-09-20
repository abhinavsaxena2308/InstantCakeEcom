const User = require("../models/User");

// Middleware to verify if user is an admin
const verifyAdmin = async (req, res, next) => {
  try {
    const email = req.decoded?.email; // comes from verifyToken

    if (!email) {
      return res.status(401).send({ message: "Unauthorized: No email found in token." });
    }

    // Find user in DB
    const user = await User.findOne({ email });

    // Check role
    const isAdmin = user?.role === "admin";

    if (!isAdmin) {
      return res.status(403).send({ message: "Forbidden access. Admins only." });
    }

    next(); // User is admin ✅
  } catch (error) {
    console.error("Error in verifyAdmin middleware:", error);
    res.status(500).send({ message: "Internal server error in verifyAdmin." });
  }
};

module.exports = verifyAdmin;
