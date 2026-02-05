const express = require("express");
const { rateLimit } = require("express-rate-limit");
const cookeParser = require("cookie-parser");
require("dotenv").config();

const { logger } = require("./logger");

const PORT = process.env.PORT ?? 3001;

const app = express();

const basicLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 10,
  message: { data: "Too many requests, try again after sometime." },
  legacyHeaders: false,
  standardHeaders: "draft-8",
});
app.use(basicLimiter);
app.use(express.json());
app.use(cookeParser());
app.use((req, res, next) => {
  logger.http("Request Recieved", {
    url: req.originalUrl,
    method: req.method,
  });
  next();
});
app.get("/", (req, res, next) => {
  res.json({ data: "task service is running." });
});
app.listen(PORT, () => {
  logger.info(`The task service is up and running on the port ${PORT}`, {
    port: PORT,
  });
});
