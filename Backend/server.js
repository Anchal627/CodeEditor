const express = require("express");
const app = express();
require("./db/conn");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const router = require("./routes/user");
const PORT = process.env.PORT || 8000;

// app.get("/", (req, res) => {
//   res.status(201).json("Server Created!");
// });

app.use(express.json());
app.use(cookieParser());
app.use(
  cors()
);

app.use(router);
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
