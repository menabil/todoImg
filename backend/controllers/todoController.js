const Todo = require("../models/todoModel");

const createTodo = async (req, res) => {
  const { task, priority, status } = req.body;

  if (!task || !priority || !status) {
    return res.send({
      success: false,
      message: "All field are require",
    });
  }

  const todo = new Todo({
    task: task,
    priority: priority,
    status: status,
    path: req.file.path,
  });

  await todo.save();

  res.send({
    success: true,
    message: "Todo Created",
  });
};

const allTodo = async (req, res) => {
  let data = await Todo.find({});
  res.send({
    success: true,
    message: "Todo Collected",
    data: data,
  });
};

const deleteTodo = async (req, res) => {
  let { id } = req.params;
  await Todo.findByIdAndDelete(id);
  res.send({
    success: true,
    message: "Todo Deleted",
  });
};

let updateTodo = async (req, res) => {
  const { id } = req.params;
  let data = await Todo.findByIdAndUpdate({ _id: id }, req.body);
  res.send({
    success: true,
    message: "Updated",
  });
};

module.exports = { createTodo, allTodo, deleteTodo, updateTodo };
