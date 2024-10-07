const express = require("express");
const app = express();
const port = 8000;

app.get("/", (req, res) => {
  res.send("Hello world from express app!");
});

app.listen(port, () => {
  console.log("Express app listening on port ", port);
});
