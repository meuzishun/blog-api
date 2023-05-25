const router = require('express').Router();
const posts = require('./posts');
const {
  registerUser,
  loginUser,
} = require('../controllers/authorizationController');

router.post('/register', registerUser);

router.post('/login', loginUser);

router.use('/posts', posts);

module.exports = router;
