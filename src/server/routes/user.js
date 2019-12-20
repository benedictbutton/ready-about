const router = require('express').Router();
const auth = require('../config/authentication');
const usersController = require('../controllers/usersController');
const upload = require('../config/multer');

// router.use(function timeLog(req, res, next) {
//   if (req.isAuthenticated()) return next();
//   res.status(404).send("Not Authenticated");
// });

router.put(
  '/imageUpload',
  auth.required,
  upload.single('avatar'),
  usersController.imageUpload,
);
router.put('/', auth.required, usersController.editUser);

module.exports = router;
