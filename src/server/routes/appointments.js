const router = require('express').Router();
const auth = require('../config/authentication');
const appointmentsController = require('../controllers/appointmentsController');

router.post(
  '/',
  auth.required,
  appointmentsController.postAppointment,
);

module.exports = router;
