const { format, transports, createLogger, level } = require("winston");

const timeZone = () => {
  return new Date().toLocaleString("en-US", {
    timeZone: "Asia/Kolkata",
  });
};
const logger = createLogger({
  level: "http",
  transports: [
    new transports.Console(),
    new transports.File({ filename: "./logs/all.log", level: "http" }),
    new transports.File({ filename: "./logs/error.log", level: "error" }),
  ],
  format: format.combine(
    format.timestamp({ format: timeZone }),
    format.printf(({ timestamp, level, message, ...meta }) => {
      return JSON.stringify({
        timestamp,
        level,
        message,
        ...meta,
      });
    }),
  ),
});

module.exports = { logger };
