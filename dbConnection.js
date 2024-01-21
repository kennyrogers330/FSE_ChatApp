const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

// connection to mongoDB
const DB = process.env.DATABASE.replace(
  " <password >",
  process.env.DATABASE_PASSWORD
);

const mongoDB = mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("DB Connection successful"));

module.exports = mongoDB;
