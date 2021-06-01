const express = require("express");
const router = express.Router();

const auth = require("../middlewares/Auth");

router.post("/", auth, (req, res) => {
  res.send(`You are authorized`);
});

module.exports = router;
