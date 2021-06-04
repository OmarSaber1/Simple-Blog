const express = require("express");
const app = express();

require("./config/db");

const cors = require("cors");

app.use(cors());

// import routes
const UserRouter = require("./routes/Users");
const AuthRouter = require("./routes/Auth");
const PostRouter = require("./routes/Posts");
const profileRouter = require("./routes/profile");

app.use(express.json());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.get("/", (req, res) => {
  res.send(`We are running`);
});

app.use("/api/users", UserRouter);
app.use("/api/auth", AuthRouter);
app.use("/api/posts", PostRouter);
app.use("/api/profile", profileRouter);
//////////////////////////////////////////////// PORT //////////////////////////////////
const PORT = process.env.PORT | 5000;

app.listen(PORT, () =>
  console.log(`App is running and listening on PORT ${PORT}`)
);
