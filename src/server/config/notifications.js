const Appointment = require('../models/appointment');

const notifications = function() {
  return {
    run() {
      Appointment.sendNotifications();
    },
  };
};

module.exports = notifications();
