const express = require("express");
const router = express.Router();
const auth = require("../middlewares/Auth");
const { body, validationResult } = require("express-validator");
const config = require("config");
const Profile = require("../Models/Profile");
const User = require("../Models/users");

const { cloudinary } = require("../utils/cloudinary");

// get my profile

router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.sign }).populate("user", [
      "name",
      "avatar",
    ]);
    console.log(profile);
    res.status(200).send(profile);
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

/// get all profiles ////

router.get("/", auth, async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    console.log(profiles);
    res.status(200).send(profiles);
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

// get user by id

router.get("/user/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const profile = await Profile.findOne({ user: id }).populate("user", [
      "name",
      "avatar",
    ]);

    res.status(200).send(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(400).send("no such user exists");
    }
    res.status(400).send(`Server Error`);
  }
});

// Create or Update a profile

router.post(
  "/",
  [auth, [body("status", "Status is required").not().isEmpty()]],
  async (req, res) => {
    //check validations
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // destructing body

    let {
      company = null,
      website = null,
      location = null,
      status = null,
      bio = null,
      githubusername = null,
      youtube = null,
      twitter = null,
      facebook = null,
      linkedin = null,
      instagram = null,
    } = req.body;

    // check if profile exists

    try {
      let profile = await Profile.findOne({ user: req.sign }); // from auth middleware

      let profileFields = {
        user: req.sign,
        company,
        website,
        location,
        status,
        bio,
        githubusername,
        youtube,
        twitter,
        facebook,
        linkedin,
        instagram,
      };
      console.log(profile);
      if (profile) {
        // if profile exists then UPDATE IT

        profile = await Profile.findOneAndUpdate(
          { user: req.sign },
          { $set: profileFields },
          {
            new: true,
          }
        );
        return res.send(profile);
      }

      //if not exists then create it
      const createProfile = await Profile.create(profileFields);
      console.log(createProfile);
      res.status(200).send(createProfile);
    } catch (err) {
      console.error({ error: err });
      res.status(400).json({ error: err });
    }
  }
);

//////////////////////////////// delete a profile , user , posts///////////////////////////////

router.delete("/", auth, async (req, res) => {
  const id = req.sign;
  console.log(id);
  try {
    // delete profile
    await Profile.findOneAndRemove({ user: id });

    // delete user
    await User.findOneAndRemove({ _id: id });

    res.send(`User removed `);
  } catch (err) {
    console.error(err);
    res.status(400).send(err);
  }
});

//// post a photo
router.post("/upload", auth, async (req, res) => {
  try {
    console.log("entered backend image");
    const fileStr = req.body.data;
    const uploadResponse = await cloudinary.uploader.upload(fileStr, {
      upload_presets: "users_images",
    });
    console.log(uploadResponse.public_id);
    let user = await User.findOneAndUpdate(
      { _id: req.sign },
      { $set: { avatar: uploadResponse.public_id } },
      {
        new: true,
        upsert: true,
      }
    );
    res.json({ msg: "yaya" });
    console.log(`user`);
    console.log(user);
  } catch (err) {
    console.error(err);
    res.status(400).json({ err: "Something went wrong" });
  }
});

router.get("/images", auth, async (req, res) => {
  try {
    const { resources } = await cloudinary.search
      .expression("resource_type:image")
      .execute();
    const user = await User.findOne({ _id: req.sign });
    const publicId = resources.filter((file) => file.public_id == user.avatar);
    console.log(publicId);
    res.send(publicId);
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
