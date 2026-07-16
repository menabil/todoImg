const express = require("express");
const mongoose = require("mongoose");
const {
  createTodo,
  allTodo,
  deleteTodo,
  updateTodo,
} = require("./controllers/todoController");
const dns = require("node:dns").setServers(["1.1.1.1"], ["8.8.8.8"]);
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const app = express();

mongoose
  .connect(
    "mongodb+srv://root:admin123@practice.4u2mmnp.mongodb.net/class08?appName=Practice",
  )
  .then(() => {
    console.log("DB Connected");
  });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));

app.post("/todo", upload.single("image"), createTodo);
app.get("/allTodo", allTodo);
app.delete("/delete/:id", deleteTodo);
app.post("/update/:id", upload.single("image"), updateTodo);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
