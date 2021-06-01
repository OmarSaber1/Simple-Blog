const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();

const bycrpt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");

const auth = require("../middlewares/Auth");

const User = require("../Models/users");

////////////////////////////////////////////// Check auth middleware if works  ////////////////////////////////////

router.get("/", auth, async (req, res) => {
  // get id from token
  const id = req.sign;

  try {
    // find user by id and never send password
    const user = await User.findById({ _id: id }).select("-password").exec();

    if (!user) {
      throw new Error(`No such user exist `);
    }
    res.status(200).json(user);
    //
  } catch (err) {
    res.status(500).json({ errors: `Server Error` });
  }
});

/////////////////////////////////////////// Login Auth Post Request //////////////////////

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
        return res.status(400).json({ error: [`Wrong Username Or Password`] });
      }

      // check of password matches
      const isMatch = bycrpt.compare(password, checkUser.password);

      if (isMatch) {
        // create a JWT Token
        const secret = config.get("Secret");

        const token = jwt.sign({ id: checkUser._id }, secret, {
          expiresIn: 360000,
        });

        res.send({ token, user: checkUser });
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ errors: "Internal Server Error" });
    }
  }
);

module.exports = router;
