const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  JWT_SECRET: process.env.JWT_SECRET,
  DB_PASS: process.env.DB_PASS,
};
