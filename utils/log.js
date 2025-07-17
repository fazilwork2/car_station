const { createLogger, format, transports } = require("winston");

require("winston-mongodb");

const transportOptions = {
  db: process.env.MONGODB_LINK,
  collection: "log",
};

const logger = createLogger({
  level: "debug",

  format: format.combine(
    format.json(),

    format.colorize({ all: true })
  ),

  transports: [
    new transports.File({ filename: "logs/error.log", level: "error" }),

    new transports.Console(),

    new transports.File({ filename: "logs/combined.log" }),

    new transports.MongoDB(transportOptions),
  ],
});
module.exports = logger