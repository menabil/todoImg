const mongoose = require("mongoose");
const { Schema } = mongoose;
const todoSchema = new Schema({
  task: {
    type: String,
    require: true,
  },
  priority: {
    type: String,
    enum: ["Low", "Mid", "High"],
    require: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Active", "Block"],
    default: "Pending",
  },
  path: {
    type: String,
  },
});

module.exports = mongoose.model("Todo", todoSchema);
