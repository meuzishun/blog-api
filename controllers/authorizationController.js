const User = require('../models/user');
const bcrypt = require('bcrypt');
const { issueJWT, getUserIdFromJWT } = require('../lib/utils');

// @desc    Register new user
// @route   POST /register
// @access  Public
const registerUser = async (req, res, next) => {
  bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
    if (err) {
      return next(err);
    }

    try {
      const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword,
        isAdmin: false,
      });

      await user.save();
      const token = issueJWT(user);

      return res.status(201).json({
        user: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          isAdmin: user.isAdmin,
        },
        jwt: token,
      });
    } catch (err) {
      return next(err);
    }
  });
};

// @desc    Login user
// @route   POST /login
// @access  Public
const loginUser = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(400).json({ message: 'No user exists with that email' });
  }

  bcrypt.compare(req.body.password, user.password, (err, passwordsMatch) => {
    if (err) {
      return res.json({ err });
    }

    if (!passwordsMatch) {
      return res.status(400).json({
        message: 'Incorrect password, please try again',
      });
    }

    const token = issueJWT(user);

    return res.status(201).json({
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        isAdmin: user.isAdmin,
      },
      jwt: token,
    });
  });
};

// @desc    Get user data
// @route   GET /profile
// @access  Private
const userProfile = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  const userId = getUserIdFromJWT(token);

  if (!userId) {
    return res.status(400).json({
      msg: 'Not verified',
    });
  }

  const user = await User.findById(userId);

  if (!user) {
    return res.status(400).json({
      msg: 'User not found',
    });
  }

  res.status(200).json({
    user: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isAdmin: user.isAdmin,
    },
  });
};

module.exports = {
  registerUser,
  loginUser,
  userProfile,
};
