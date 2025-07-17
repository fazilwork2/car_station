const jwt = require("jsonwebtoken");

const AdminChecker = (req, res, next) => {
  try {
    const token = req.cookies.accesToken;

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }
    const decoded = jwt.verify(token, process.env.SEKRET_KEY);

    console.log("Decoded token:", decoded.role);

    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "You are not admin" });
    }

    next();
  } catch (error) {
    console.error("Token verification error:", error.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = AdminChecker;
