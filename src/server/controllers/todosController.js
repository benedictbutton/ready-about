const mongoose = require('mongoose');
const Todo = require('../models/todo');

// Validate request parameters, queries using express-validator

exports.getTodos = async function(req, res) {
  try {
    const todos = await Todo.find({ id: req.payload.id });
    return res.json({ todos });
  } catch (err) {
    res.status(err.statusCode || 502).json(err.error || err);
  }
};

exports.postTodo = async function(req, res) {
  try {
    const todo = new Todo({
      id: req.payload.id,
      item: req.body.item,
      completed: false,
    });
    await todo.save();
    res.status(201).json({ todo });
  } catch (err) {
    res.status(err.statusCode || 502).json(err.error || err);
  }
};

exports.editTodo = async function(req, res) {
  try {
    const todo = await Todo.findOneAndUpdate(
      {
        _id: req.body.todo.id,
      },
      { [req.body.todo.editProp]: req.body.todo.edit },
      { new: true },
    );
    res.status(201).json({ todo });
  } catch (err) {
    res.status(err.statusCode || 502).json(err.error || err);
  }
};

exports.deleteTodos = async function(req, res) {
  try {
    await Todo.deleteMany({ _id: req.body.selected });
    return res.status(201).json(req.body.selected);
  } catch (err) {
    res.status(err.statusCode || 502).json(err);
  }
};
