const mongoose = require("mongoose");
require("dotenv").config();
const DB = process.env.MONGO_URI;
mongoose
  .connect(DB)
  .then(() => console.log("Database Connected"))
  .catch((err) => {
    console.log(err);
  });
