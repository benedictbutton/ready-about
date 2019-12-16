const express = require('express');

const router = express.Router();

const client = require('./client');
const user = require('./user');
const todos = require('./todos');
const appointments = require('./appointments');

router.use('/auth', client);
router.use('/user', user);
router.use('/todos', todos);
router.use('/appointments', appointments);

module.exports = router;
