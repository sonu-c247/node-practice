"use strict";
const store = require("../controllers/UserController");
const UserModel = require("../models/UserModel");
/**
 * Get all record
 * @param { req, res }
 * @returns JsonResponse
 */
 const signUpAuth = async (req, res, next) => {
  try {
      const { firstName, lastName, email, password } = req.body;
  
      await UserModel.findOne({ email: req.body.email });
    if (UserModel) {
        return res.status(200).send("That user already exisits!");
        next();
      } else {
        UserModel = new UserModel({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: req.body.password
        });
      }
  
      return res.status(200).json({
        success: true,
        message: "Data saved successfully.",
        data: [],
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message:
          "We are having some error while completing your request. Please try again after some time.",
        error: error,
      });
    }
}
module.exports = {
    signUpAuth
  };