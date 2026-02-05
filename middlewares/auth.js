const jwt = require("jsonwebtoken");
const { logger } = require("../logger");
const JWT_KEY = process.env.JWT_SECRET_KEY;
const validateUser = (req, res, next) => {
  /**
   * check if token is there or not in the cookies
   * if it is not there then send 401 unauthorized response
   * if it is there then verify token by using jwt
   * if it is valid then attach id to req.user
   * else send bad request response 400
   */
  try {
    const { token } = req.cookies;
    if (!token) {
      res.status(401).json({ data: "User is not authorized." });

      return;
    }
    if (!JWT_KEY) {
      res.status(500).json({ data: "Something went wrong" });
      return;
    }
    const { userId } = jwt.verify(token, JWT_KEY);
    if (!userId) {
      res.status(400).json({ data: "User is not authorized." });
      return;
    }
    req.userId = userId;
    next();
  } catch (error) {
    res.status(500).json({ data: "something went wrong." });
    logger.error(error.message, {
      stack: error.stack,
    });
  }
};

module.exports = { validateUser };
