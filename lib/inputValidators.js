const User = require('../models/user');
const { body, validationResult } = require('express-validator');

const firstNameValidator = body('firstName')
  .trim()
  .isLength({ min: 1 })
  .escape()
  .withMessage('Please include a first name.');

const lastNameValidator = body('lastName')
  .trim()
  .isLength({ min: 1 })
  .escape()
  .withMessage('Please include a last name.');

const emailValidator = body('email')
  .trim()
  .isLength({ min: 1 })
  .escape()
  .isEmail()
  .withMessage('Please include a valid email.');

const passwordValidator = body('password')
  .isLength({ min: 8 })
  .withMessage('Password must be at least 8 characters.');

const titleValidator = body('title')
  .trim()
  .isLength({ min: 1 })
  .escape()
  .withMessage('Please include content.');

const contentValidator = body('content')
  .isLength({ min: 1 })
  .withMessage('Please include content.');

const checkValidations = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors, errors: errors.errors });
  }
  return next();
};

module.exports = {
  firstNameValidator,
  lastNameValidator,
  emailValidator,
  passwordValidator,
  titleValidator,
  contentValidator,
  checkValidations,
};
