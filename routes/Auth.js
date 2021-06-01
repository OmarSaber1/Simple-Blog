const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.send(`Auth route is running`);
});

module.exports = router;
