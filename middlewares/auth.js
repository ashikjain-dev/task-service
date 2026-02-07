const jwt = require("jsonwebtoken");
const { logger } = require("../logger");
const JWT_KEY = process.env.JWT_SECRET_KEY;
/**
 * check if token is there or not in the cookies
 * if it is not there then send 401 unauthorized response
 * if it is there then verify token by using jwt
 * if it is valid then attach id to req.user
 * else send bad request response 400
 */
const validateUser = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    const error = new Error("User is not authorized.");
    error.statusCode = 401;
    throw error;
  }
  if (!JWT_KEY) {
    throw new Error("JWT_SECRET_KEY is not defined in environment");
  }
  const { userId } = jwt.verify(token, JWT_KEY);
  if (!userId) {
    const error = new Error("User is not authorized.");
    error.statusCode = 401;
    throw error;
  }
  req.userId = userId;
  next();
};

module.exports = { validateUser };
