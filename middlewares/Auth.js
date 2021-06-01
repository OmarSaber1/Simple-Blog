const jwt = require("jsonwebtoken");
const config = require("config");
const Secret = config.get("Secret");

module.exports = (req, res, next) => {
  try {
    const token = req.header("Authorization");

    const decode = jwt.verify(token, Secret);

    req.sign = decode.id;

    next();
  } catch (err) {
    res.status(401).send(`You Aren't Authorized`);
  }
};
