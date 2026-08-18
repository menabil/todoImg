require("node:dns").setServers(["1.1.1.1"], ["8.8.8.8"]);
const express = require("express");
const cors = require("cors");
const dbConnection = require("./config/databaseConfig");
const router = require("./routes/todoRoutes");
const productRoute = require("./routes/productRoute");
const app = express();

dbConnection();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/", router);
app.use("/product", productRoute);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
