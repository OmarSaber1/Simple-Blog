const express = require("express");
const app = express();

const UserRouter = require("./routes/Users");
const AuthRouter = require("./routes/Auth");
const PostRouter = require("./routes/Posts");

app.use(express.json());

app.get("/", (req, res) => {
  res.send(`We are running`);
});

app.use("/api/users", UserRouter);
app.use("/api/auth", AuthRouter);
app.use("/api/posts", PostRouter);
//////////////////////////////////////////////// PORT //////////////////////////////////
const PORT = process.env.PORT | 5000;

app.listen(PORT, () =>
  console.log(`App is running and listening on PORT ${PORT}`)
);
