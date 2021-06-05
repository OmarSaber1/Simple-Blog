const express = require("express");
const router = express.Router();
const auth = require("../middlewares/Auth");
const { body, validationResult } = require("express-validator");
const User = require("../Models/users");
const Post = require("../models/posts");

//////////////////// GET ALL POSTs //////////////////////

router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find({});
    res.status(200).send(posts);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "SERVER ERROR!" });
  }
});

//////////////////// GET Post by id //////////////////////

router.get("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findOne({ _id: id });
    if (!post) {
      return res.status(401).json({ error: `POST NOT FOUND` });
    }
    res.status(200).send(post);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "SERVER ERROR!" });
  }
});

//////////////////// CREATING A NEW POST //////////////////////

router.post(
  "/",
  [auth, [body("text", "Text is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // destructing body TEXT

    const { text } = req.body;

    try {
      const user = await User.findById(req.sign);
      const post = {
        text,
        avatar: user.avatar,
        name: user.name,
        user: req.sign,
      };
      const newPost = await Post.create(post);

      console.log(newPost);
      res.status(200).send(newPost);
    } catch (err) {
      console.error(err);
      res.status(400).json({ err });
    }
  }
);

//////////////////// Create LIKES route //////////////////////

router.put("/like/:post_id", auth, async (req, res) => {
  try {
    const { post_id } = req.params;

    const post = await Post.findById(post_id);

    const like = post?.likes.filter(
      (like) => like.user.toString() === req.sign
    );

    console.log(like);

    ///////////////////// unlike post //////////////////

    if (like.length) {
      const index = post.likes.map((like) => like.user).indexOf(req.sign);
      console.log(index);

      const unLike = post.likes.splice(index, 1);

      await post.save();
      return res.status(200).send(post);
    }
    /////////////// LIKE  POST /////////////////

    post.likes.unshift({ user: req.sign });

    await post.save();

    res.status(200).send(post);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err });
  }
});

//////////////////// Comment on post ///////////////////////////

router.post(
  "/comment/:comment_id",
  [auth, [body("text", "Text is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // destructing body TEXT

    const { text } = req.body;

    try {
      const user = await User.findById(req.sign);
      const post = await Post.findById(req.params.comment_id);

      console.log(post);
      const comment = {
        text,
        avatar: user.avatar,
        name: user.name,
        user: req.sign,
      };

      post.comments.unshift(comment);

      await post.save();

      console.log(post);
      res.status(200).send(post);
    } catch (err) {
      console.error(err);
      res.status(400).json({ err });
    }
  }
);

//////////////////// Delete comment by id //////////////////////
////////////////////////////////////////////////////////////

router.delete("/comment/:id/:comment_id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(400).json({ message: `no such post found` });
    }

    const commentIndex = post.comments
      .map((comment) => comment.id)
      .indexOf(req.params.comment_id);

    console.log("comment" + commentIndex);

    if (commentIndex < 0) {
      return res.status(400).json({ message: `no such comment found` });
    }

    console.log(commentIndex);
    post.comments.splice(commentIndex, 1);

    await post.save();

    res.status(200).json(post);
  } catch (err) {
    console.error(err);
    res.status(400).json({ err });
  }
});

//////////////////// Delete Post by id //////////////////////
////////////////////////////////////////////////////////////

router.delete("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findOne({ _id: id });
    if (!post) {
      return res.status(401).json({ error: `POST NOT FOUND` });
    }
    await Post.deleteOne({ _id: id });
    console.log(id);
    res.status(200).send(id);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "SERVER ERROR!" });
  }
});

module.exports = router;
