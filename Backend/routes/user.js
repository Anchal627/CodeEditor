const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
require("dotenv").config();
const axios = require("axios");
const User = require("../models/userSchema");
const authenticate = require("../middleware/authenticate");
router.post("/signup", async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  if (!name || !email || !password || !confirmPassword) {
    return res.status(422).json({
      error: "Fill all the details!",
    });
  }
  try {
    const preuser = await User.findOne({ email: email });
    if (preuser) {
      return res.status(422).json({
        error: "User already existing with this email.",
      });
    } else if (password !== confirmPassword) {
      return res.status(422).json({
        error: "Password and Confirm Password not matched.",
      });
    } else {
      const finalUser = new User({
        name: name,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      });
      const storeData = await finalUser.save();
      return res.status(201).json({ status: 201, storeData });
      // console.log(storeData);
    }
  } catch (error) {
    return res.status(422).json(error);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({
      error: "Fill all the details!",
    });
  }
  try {
    const userValid = await User.findOne({ email: email });
    if (userValid) {
      const isMatch = await bcrypt.compare(password, userValid.password);
      if (!isMatch) {
        return res.status(422).json({
          error: "Invalid details.",
        });
      } else {
        const token = await userValid.generateAuthToken();
        res.cookie("usercookie", token, {
          expires: new Date(Date.now() + 9000000),
          httpOnly: true,
        });
        // return res.status(200).json({ token });
        const result = {
          userValid,
          token,
        };
        res.status(201).json({
          status: 201,
          result,
        });
      }
    }
  } catch (error) {
    res.status(401).json(error);
    console.log("catch block");
  }
});

router.get("/validuser", authenticate, async (req, res) => {
  // console.log("done");
  try {
    const ValidUserOne = await User.findOne({ _id: req.userId });
    res.status(401).json({ status: 201, ValidUserOne });
  } catch (error) {
    res.status(401).json({ status: 201, error });
  }
});

router.get("/logout", authenticate, async (req, res) => {
  try {
    req.rootUser.tokens = req.rootUser.tokens.filter((curr) => {
      return curr.token !== req.token;
    });
    res.clearCookie("usercookie", { path: "/" });
    req.rootUser.save();
    res.status(201).json({ status: 201 });
  } catch (error) {
    res.status(401).json({ status: 401, error });
  }
});

router.post("/compile", (req, res) => {
  // getting the required data from the request
  let code = req.body.code;
  let language = req.body.language;
  let input = req.body.input;

  let languageMap = {
    c: { language: "c", version: "10.2.0" },
    cpp: { language: "c++", version: "10.2.0" },
    python: { language: "python", version: "3.10.0" },
    java: { language: "java", version: "15.0.2" },
    php: { language: "php", version: "8.2.3" },
    ruby: { language: "ruby", version: "3.0.1" },
    csharp: { language: "csharp", version: "5.0.201" },
    go: { language: "go", version: "1.16.2" },
    swift: { language: "swift", version: "5.3.3" },
    rust: { language: "rust", version: "1.68.2" },
  };

  if (!languageMap[language]) {
    return res.status(400).send({ error: "Unsupported language" });
  }

  let data = {
    language: languageMap[language].language,
    version: languageMap[language].version,
    files: [
      {
        name: "main",
        content: code,
      },
    ],
    stdin: input,
  };

  let config = {
    method: "post",
    url: "https://emkc.org/api/v2/piston/execute",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  // calling the code compilation API
  axios(config)
    .then((response) => {
      res.json(response.data.run); // Send the run object directly
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send({ error: "Something went wrong" });
    });
});
router.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://emkc.org/api/v2/piston/runtimes");
    const languages = response.data;

    // Send the list of languages as response
    res.status(200).json(languages);
  } catch (error) {
    console.error("Error fetching languages:", error);
    res.status(500).json({ error: "Failed to retrieve languages" });
  }
});
module.exports = router;
