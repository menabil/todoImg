const Todo = require("../models/todoModel");

const createTodo = async (req, res) => {
  const { task, priority, status } = req.body;

  if (!task || !priority || !status) {
    return res.status(400).json({
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

  try {
    let data = await todo.save();

    res.status(201).json({
      success: true,
      message: "Todo Created",
    });
  } catch (error) {
    console.log(error);
  }
};

const allTodo = async (req, res) => {
  try {
    let data = await Todo.find({});
    res.status(200).json({
      success: true,
      message: "Todo Collected",
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: error,
    });
  }
};

const deleteTodo = async (req, res) => {
  try {
    let { id } = req.params;
    let data = await Todo.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Todo Deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: error,
    });
  }
};

let updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    let data = await Todo.findByIdAndUpdate({ _id: id }, req.body);
    res.status(200).json({
      success: true,
      message: "Updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: error,
    });
  }
};

module.exports = { createTodo, allTodo, deleteTodo, updateTodo };
