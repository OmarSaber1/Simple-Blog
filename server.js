const express = require("express");
const app = express();
const path = require("path");

require("./config/db");

const cors = require("cors");

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// import routes
const UserRouter = require("./routes/Users");
const AuthRouter = require("./routes/Auth");
const PostRouter = require("./routes/Posts");
const profileRouter = require("./routes/profile");

app.use("/api/users", UserRouter);
app.use("/api/auth", AuthRouter);
app.use("/api/posts", PostRouter);
app.use("/api/profile", profileRouter);

// serve static assets in production
if (process.env.NODE_ENV === "production") {
  // set static folder
  app.use(express.static("blog/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "blog", "build", "index.html"));
  });
}
//////////////////////////////////////////////// PORT //////////////////////////////////
const PORT = process.env.PORT | 5000;

app.listen(PORT, () =>
  console.log(`App is running and listening on PORT ${PORT}`)
);
