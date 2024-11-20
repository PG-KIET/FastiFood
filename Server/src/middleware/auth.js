import jwt from "jsonwebtoken";

export const verifyToken = async (req, reply, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return reply.status(401).send({ message: "Access token is required" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded;
    next()
  } catch (err) {
    return reply.status(403).send({ error: "Invalid or expired token" });
  }
};
