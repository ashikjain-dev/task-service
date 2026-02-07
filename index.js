const express = require("express");
const { rateLimit } = require("express-rate-limit");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const { logger } = require("./logger");
const { taskRoute } = require("./routes/tasks");
const { connectToMongoDB } = require("./config/mongo");
const { errorHandler } = require("./middlewares/");

const PORT = process.env.PORT ?? 3001;

const app = express();

const basicLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 10,
  message: { data: "Too many requests, try again after some time." },
  legacyHeaders: false,
  standardHeaders: "draft-8",
});
app.use(basicLimiter);
app.use(express.json());
app.use(cookieParser());
app.use((req, res, next) => {
  logger.http("Request Received", {
    url: req.originalUrl,
    method: req.method,
  });
  next();
});
app.use("/api/v1/tasks", taskRoute);
app.get("/", (req, res, next) => {
  res.json({ data: "task service is running." });
});
// 404 handler
app.use((req, res, next) => {
  const error = new Error("Page not found");
  error.statusCode = 404;
  next(error);
});
// Global Error Handler
app.use(errorHandler);

connectToMongoDB()
  .then(() => {
    app.listen(PORT, () => {
      logger.info(`The task service is up and running on the port ${PORT}`, {
        port: PORT,
      });
    });
  })
  .catch((error) => {
    logger.error(error.message, {
      stack: error.stack,
    });
    process.exit(0);
  });
