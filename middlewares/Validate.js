const { UserModel } = require("./../models");
/**
 * Validates signup request
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const validateSignup = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  let errors = {};

  if (!firstName) {
    errors["firstName"] = "First name is required";
  } else {
    if (!(firstName || "").match(/^[a-z0-9]+$/i)) {
      errors["firstName"] = "First name is invalid";
    }
  }

  if (!lastName) {
    errors["lastName"] = "Last name is required";
  } else {
    if (!(lastName || "").match(/^[a-z0-9]+$/i)) {
      errors["lastName"] = "Last name is invalid";
    }
  }
  if (!email) {
    errors["email"] = "Email is required";
  } else {
    if (!(email || "").match(/\S+@\S+\.\S+/)) {
      errors["email"] = "Email is invalid";
    } else {
      const user = await UserModel.findOne({ email });
      if (user) {
        errors["email"] = "Email is already taken";
      }
    }
  }

  if (!password) {
    errors["password"] = "Password is required";
  } else {
    if (password.length < 8) {
      errors["password"] = "Password must be at least 8 characters long";
    } else {
      if (
        !password.match(
          new RegExp(
            "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?]).+$"
          )
        )
      ) {
        errors["password"] =
          "Password must contain, at least, one lowercase letter, one uppercase letter, one number and one special character";
      }
    }
  }

  if (Object.keys(errors).length) {
    return res.status(422).json(errors);
  }

  next();
};

module.exports = {
  validateSignup,
};
