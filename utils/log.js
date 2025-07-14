const { createLogger, format, transports } = require("winston");

require("winston-mongodb");

const transportOptions = {
  db: "mongodb+srv://fsadikov574:0NOYtSKicb6NFivX@cluster0.unqrha0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
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