const router = require('express').Router();
const posts = require('./posts');
const {
  firstNameValidator,
  lastNameValidator,
  emailValidator,
  passwordValidator,
  checkValidations,
} = require('../lib/inputValidators');
const {
  registerUser,
  loginUser,
  userProfile,
} = require('../controllers/authorizationController');

router.post(
  '/register',
  firstNameValidator,
  lastNameValidator,
  emailValidator,
  passwordValidator,
  checkValidations,
  registerUser
);

router.post('/login', emailValidator, checkValidations, loginUser);

router.get('/profile', userProfile);

router.use('/posts', posts);

module.exports = router;
