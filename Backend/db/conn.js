const mongoose = require("mongoose");
const DB =
  "mongodb+srv://Anchal:2panwxxjCnw6ds_@cluster0.3pgk4.mongodb.net/Authusers?retryWrites=true&w=majority&appName=Cluster0";
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database Connected"))
  .catch((err) => {
    console.log(err);
  });
