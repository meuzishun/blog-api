const User = require('../models/user');
const bcrypt = require('bcrypt');
const {
  firstNameValidator,
  lastNameValidator,
  emailValidator,
  passwordValidator,
  checkValidations,
  checkForCurrentUser,
} = require('../lib/inputValidators');

const registerUser = [
  firstNameValidator,
  lastNameValidator,
  emailValidator,
  passwordValidator,
  checkValidations,
  checkForCurrentUser,
  async (req, res, next) => {
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
        return res.status(200).json({
          user,
        });
      } catch (err) {
        console.log(err);
        return next(err);
      }
    });
  },
];

const loginUser = async (req, res, next) => {
  return res.status(200).json({
    msg: 'submitting login data...',
  });
};

module.exports = {
  registerUser,
  loginUser,
};
