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

const authorizeRoles = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ message: "Access Denied" });
  }
  next();
};

module.exports = { authenticate, authorizeRoles };
