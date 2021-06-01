const express = require("express");
const app = express();

app.use(express.json());

const PORT = process.env.PORT | 5000;

app.get("/", (req, res) => {
  res.send(`We are running`);
});
app.listen(PORT, () =>
  console.log(`App is running and listening on PORT ${PORT}`)
);
