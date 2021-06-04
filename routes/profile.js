const express = require("express");
const router = express.Router();
const auth = require("../middlewares/Auth");
const { body, validationResult } = require("express-validator");
const config = require("config");
const Profile = require("../Models/Profile");
const User = require("../Models/users");

// get my profile

router.get("/me", auth, async (req, res) => {
  try {
    console.log("entrd");
    console.log(req.sign);

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
  [
    auth,
    [
      body("status", "Status is required").not().isEmpty(),
      body("skills", "Skills is required").not().isEmpty(),
    ],
  ],
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
      skills = null,
      bio = null,
      githubusername = null,
      youtube = null,
      twitter = null,
      facebook = null,
      linkedin = null,
      instagram = null,
    } = req.body;

    if (skills) {
      console.log(skills);
      skills = skills.split(",").map((skill) => {
        return skill.trim();
      });
      //Generate an array and trim spaces
      console.log(`skills in bi is ${skills}`);
    }

    // check if profile exists

    try {
      let profile = await Profile.findOne({ user: req.sign }); // from auth middleware

      let profileFields = {
        user: req.sign,
        company,
        website,
        location,
        status,
        skills,
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

// add experiece route

router.put(
  "/experience",
  [
    auth,
    [
      body("title", "title is requried").not().isEmpty(),
      body("company", "company is requried").not().isEmpty(),
      body("from", "from is requried").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }

    // destructing body
    const { title, company, location, from, to, current, description } =
      req.body;

    // experience const
    const experience = {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    };

    try {
      const profile = await Profile.findOne({ user: req.sign });

      if (!profile) throw "No such profile exist";
      let updatedExperience = profile.experience.unshift(experience);

      await profile.save();

      res.send(profile);
    } catch (err) {
      console.error(err);
      res.status(400).send(`Server Error`);
    }
  }
);

router.delete("/experience/:id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.sign });

    const idIndex = profile.experience
      .map((exp) => exp._id)
      .indexOf(req.params.id);

    console.log(idIndex);

    if (idIndex !== -1) {
      profile.experience.splice(idIndex, 1);

      await profile.save();
      return res.status(200).send(profile);
    }
    res.send(`no such id experience `);
    // catch errors
  } catch (err) {
    console.error(err);
    res.status(400).send(`Server Error`);
  }
});

//////////////////////////////////////// add education route//////////////////////////

router.put(
  "/education",
  [
    auth,
    [
      body("school", "school is requried").not().isEmpty(),
      body("degree", "degree is requried").not().isEmpty(),
      body("fieldofstudy", "fieldofstudy is requried").not().isEmpty(),
      body("from", "from is requried").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }

    // destructing body
    const { school, degree, fieldofstudy, from, to, current, description } =
      req.body;

    // Education const
    const education = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    };

    try {
      const profile = await Profile.findOne({ user: req.sign });

      if (!profile) throw "No such profile exist";
      let updatedEducation = profile.education.unshift(education);

      await profile.save();

      res.send(profile);
    } catch (err) {
      console.error(err);
      res.status(400).send(`Server Error`);
    }
  }
);

//////////////////////////////// delete an education ///////////////////////////////

router.delete("/education/:id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.sign });

    const idIndex = profile.education
      .map((exp) => exp._id)
      .indexOf(req.params.id);

    console.log(idIndex);

    if (idIndex !== -1) {
      profile.education.splice(idIndex, 1);

      await profile.save();
      return res.status(200).send(profile);
    }
    res.send(`no such id education `);
    // catch errors
  } catch (err) {
    console.error(err);
    res.status(400).send(`Server Error`);
  }
});

//////////////////////////////// get github repos for profile///////////////////////////////

router.get("/github/:username", (req, res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${
        req.params.username
      }/repos?per_page=5&
      sort=created:asc&client_id=${config.get(
        "githubClientId"
      )}&client_secret=${config.get("githubSecret")}`,
      method: "GET",
      headers: { "user-agent": "node.js" },
    };

    request(options, (error, response, body) => {
      if (error) {
        if (response.statusCode !== 200) {
          return res.status(400).send("no such github found");
        }
      }
      res.json(JSON.parse(body));
    });
  } catch (err) {
    console.error(err);
    res.status(400).send(`no such github found`);
  }
});

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

router.post("/upload", auth, async (req, res) => {
  try {
    console.log("entered backend image");
    const fileStr = req.body.data;
    const uploadResponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: "users_images",
    });
    console.log(uploadResponse);
    res.json({ msg: "yaya" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Something went wrong" });
  }
});

module.exports = router;
