const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  text: {
    type: String,
    require: true,
  },
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
      text: {
        type: String,
        require: true,
      },
      date: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
  likes: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now(),
  },
});

const postModel = mongoose.model("post", postSchema);

module.exports = postModel;
