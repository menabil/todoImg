const express = require("express");
const cors = require("cors");
const mongoss = require("mongoose");
const app = express();

app.use(express.json());




app.listen(5000, () => {
  console.log("Server is Running");
});
