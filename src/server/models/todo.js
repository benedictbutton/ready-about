const mongoose = require("mongoose");
// const DateSchema = new mongoose.Schema({ type: Date, default: Date.now });
// Define schema for todo items
const TodoSchema = new mongoose.Schema({
  id: { type: String },
  item: {
    type: String
  },
  completed: {
    type: Boolean
  },
  appointment: { type: mongoose.Schema.Types.ObjectId, ref: "Appointment" },
  created: { type: Date, default: Date.now }
});

const Todo = mongoose.model("todo", TodoSchema);
module.exports = Todo;
