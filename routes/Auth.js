const express = require("express");
const router = express.Router();
const auth = require("../middlewares/Auth");
const User = require("../Models/users");
const { body, validationResult } = require("express-validator");
const config = require("config");
const bycrpt = require("bcrypt");
const jwt = require("jsonwebtoken");

// User Register Post
router.get("/", auth, async (req, res) => {
  const id = req.sign;
  try {
    const user = await User.findById({ _id: id }).select("-password").exec();
    console.log(typeof user, user);
    if (!user) {
      throw "nso";
    }
    res.json(user);
    //
  } catch (err) {
    res.status(500).json({ errors: `Server Error` });
  }
});

// Login Auth

router.post(
  "/",
  [
    body("email", "Please include a valid email").isEmail(),
    body("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    try {
      // destructing Body =>  email , password

      const { email, password } = req.body;

      // get user

      const checkUser = await User.findOne({ email }).exec();

      // check if user already exists!

      if (!checkUser) {
        return res.status(500).json({ error: [`Wrong Username Or Password`] });
      }

      const isMatch = bycrpt.compare(password, checkUser.password);

      if (isMatch) {
        // create a JWT Token
        const secret = config.get("Secret");

        const token = jwt.sign({ id: checkUser._id }, secret, {
          expiresIn: 360000,
        });

        console.log(token);

        res.send({ token });
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ errors: "Server Error" });
    }
  }
);

module.exports = router;
