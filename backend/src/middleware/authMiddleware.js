require("dotenv").config();
const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  const authToken = req.headers.authorization;
  if (authToken == null) {
    return res.status(401).json({ message: "AuthToken not provided" });
  }
  const token = authToken.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid Token" });
    }
    req.user = { userId: user.userId, email: user.email };
    next();
  });
};
module.exports = authMiddleware;
