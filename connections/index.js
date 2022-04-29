const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const DBUrl = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DBUrl)
  .then(() => {
    console.log("資料庫已連線");
  })
  .catch((err) => {
    console.log(err);
  });
