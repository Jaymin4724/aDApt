import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
      return res.status(401).json({ error: "Authorization header missing" });
    }
    const token = authHeader.split("Bearer ")[1];
    if (!token) {
      return res.status(401).json({ error: "Token missing or malformed" });
    }
    const decoded = jwt.verify(token, process.env.SECRET);
    console.log("Decoded Token Payload :", decoded);
    req.user = decoded;
    next();
  } catch (err) {
    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Invalid token" });
    } else if (err.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token expired" });
    }
    return res.status(500).json({ error: "Internal server error" });
  }
};

export default authMiddleware;
