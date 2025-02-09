require("dotenv").config();
const mongoose = require("mongoose");
const URL = process.env.DatabaseURL;
if (!URL) {
  console.log("URL Not Found. Exiting Process");
  process.exit(1);
}
const connectDB = async () => {
  try {
    await mongoose.connect(URL);
    console.log("Connected to DB successfully.");
  } catch (err) {
    console.log("Error while connecting to database", err);
    process.exit(1);
  }
};
module.exports = connectDB;
