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

const loginUser = [
  emailValidator,
  checkValidations,
  async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res
        .status(300)
        .json({ message: 'No user exists with that email' });
    }

    bcrypt.compare(req.body.password, user.password, (err, passwordsMatch) => {
      if (err) {
        return res.json({ err });
      }

      if (!passwordsMatch) {
        return res.status(200).json({
          message: 'Incorrect password, please try again',
        });
      }

      const { firstName, lastName, email, isAdmin } = user;
      return res.status(200).json({ firstName, lastName, email, isAdmin });
    });
  },
];

module.exports = {
  registerUser,
  loginUser,
};
