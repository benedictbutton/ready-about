const router = require('express').Router();
const auth = require('../config/authentication');
const todosController = require('../controllers/todosController');

router.get('/', auth.required, todosController.getTodos);
router.post('/', auth.required, todosController.postTodo);
router.delete('/', auth.required, todosController.deleteTodos);

module.exports = router;
