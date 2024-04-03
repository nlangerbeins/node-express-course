const Task = require('../modules/task');

const getAllTasks = (req, res) => {
  res.send('get all items');
};

const createTask = async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
};

const getTask = (req, res) => {
  res.json({ id: req.params.id });
};

const updateTask = (req, res) => {
  res.send('update task');
};

const deleteTask = (req, res) => {
  res.send('delete Task');
};

module.exports = { getAllTasks, createTask, getTask, updateTask, deleteTask };
