const asyncHandler = require('express-async-handler');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const { issueJWT } = require('../lib/utils');

// @desc    Register new user
// @route   POST /register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    isAdmin: false,
  });

  if (!user) {
    res.status(400);
    throw new Error('User not found');
  }

  const token = issueJWT(user);

  return res.status(201).json({
    user: {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    jwt: token,
  });
});

// @desc    Login user
// @route   POST /login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(404);
    throw new Error('No user exists with that email');
  }

  const passwordsMatch = await bcrypt.compare(req.body.password, user.password);

  if (!passwordsMatch) {
    res.status(401);
    throw new Error('Incorrect password, please try again');
  }

  const token = issueJWT(user);

  return res.status(200).json({
    user: {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    jwt: token,
  });
});

// @desc    Get user data
// @route   GET /profile
// @access  Private
const userProfile = asyncHandler(async (req, res) => {
  const user = req.user;

  if (!user) {
    res.status(400);
    throw new Error('User not found');
  }

  res.status(200).json({
    user: {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isAdmin: user.isAdmin,
    },
  });
});

module.exports = {
  registerUser,
  loginUser,
  userProfile,
};
