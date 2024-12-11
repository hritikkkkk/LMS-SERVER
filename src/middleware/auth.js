const jwt = require("jsonwebtoken");
const { ServerConfig } = require("../config");

const authenticate = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ message: "Unauthorized Access" });

  try {
    const decoded = jwt.verify(token, ServerConfig.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid Token" });
  }
};

const authorizeRole = (requiredRole) => {
  return (req, res, next) => {
    try {
      // Check if user's role matches the required role
      if (req.user.role !== requiredRole) {
        return res.status(403).json({
          message: "Forbidden: You do not have access to this resource",
        });
      }
      next();
    } catch (error) {
      console.error("Error in authorizeRole middleware:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
};

module.exports = { authenticate, authorizeRole };
