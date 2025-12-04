import jwt from 'jsonwebtoken';

export const Authenticated = async (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header || !header.startsWith("Bearer ")) {
      return res.status(400).json({ message: "no token found" });
    }
    const token = header.split(" ")[1];

    const decoded = jwt.verify(token, "MY_SECRET_KEY");
    req.user = { id: decoded.id };
    next();
  } catch (error) {
    console.log("JWT ERROR:", error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
