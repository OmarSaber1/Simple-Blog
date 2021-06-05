const mongoose = require("mongoose");
const config = require("config");
const db = config.get("URI");

const mongoDb = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log(`Connected to atlas DB ...`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = mongoDb();
