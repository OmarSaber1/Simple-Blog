const express = require("express");
const app = express();
const router = express.Router();

app.use(express.json());


app.get("/", (req, res) => {
  res.send(`We are running`);
});

router.use('api/users',userRouter)
//////////////////////////////////////////////// PORT //////////////////////////////////
const PORT = process.env.PORT | 5000;

app.listen(PORT, () =>
  console.log(`App is running and listening on PORT ${PORT}`)
);
