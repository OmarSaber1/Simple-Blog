const express = require("express");
const router = express.Router();

// import user Model
const User = require("../Models/users");

router.get("/", (req, res) => {
  res.send(`User Router is running`);
});

module.exports = router;
