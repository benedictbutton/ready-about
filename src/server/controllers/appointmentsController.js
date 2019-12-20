const mongoose = require('mongoose');
const moment = require('moment');
const Appointment = require('../models/appointment');
const Todo = require('../models/todo');

exports.postAppointment = async function(req, res) {
  try {
    const {
      id,
      username,
      phoneNumber,
      selected,
      selectedDate,
    } = req.body;

    const appointment = new Appointment({
      name: username,
      phoneNumber: `+1${phoneNumber}`,
      notification: 10,
      timeZone: 'America/New_York',
      time: moment(selectedDate).utcOffset(5),
    });
    await appointment.save();
    const todo = await Todo.findOneAndUpdate(
      { _id: selected[0] },
      { appointment: apointment },
      { upsert: true, new: true },
    );
    res.status(201).json({ todo });
    // await todo.save().then(function() {
    //   res.status(201).json({ todo });
    // });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode || 502).json(err.error || err);
  }
};
