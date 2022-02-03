"use strict";
const { UserModel } = require("../models");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

/**
 * @api {get} /users User List
 * @apiName GetUser
 * @apiGroup User
 * @apiDescription Get list of all users
 * @apiHeader {String} Authorization JWT of logged in user
 * @apiPermission CreateUser
 * @apiQuery {number} limit=10 limit number of records
 * @apiQuery {number} page=1 current page number
 * @apiSuccess {String} firstName First name of the User.
 * @apiSuccess {String} lastName  Last name of the User.
 * @apiSuccess {String} email  Email of user.
 * @apiSuccess {String} status  current status of user.
 * @apiSuccessExample {json} Success:
 * HTTP/1.1 200 OK
 * {
 *   message: "Users fetched successfully.",
 *   data: [{
 *     firstName: "John",
 *     lastName: "Doe",
 *     email: "john.doe@example.email"
 *     status: "active" // allowed values, active, inactive
 *   }],
 *}
 * @apiError (Error 500) {string} message error message
 * @apiError (Error 500) {string} error error stack
 * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 500 Internal Server Error
 * {
 *   "message": "We are having some error while completing your request. Please try again after some time."
 *   "error": actual error stack
 * }
 */
const index = async (req, res) => {
  try {
    const users = await UserModel.find();
    return res.status(200).json({
      message: "Users fetched successfully.",
      data: users,
    });
  } catch (error) {
    return res.status(500).json({
      message:
        "We are having some error while completing your request. Please try again after some time.",
      error: error,
    });
  }
};
/**
 * @api {post} /users Create User
 * @apiName CreateUser
 * @apiGroup User
 * @apiDescription Creates a new user
 * @apiBody {string} firstName first name of user
 * @apiBody {string} [middleName] optional middle name of user
 * @apiBody {string} lastName last name of user
 * @apiBody {string} email email of user
 * @apiBody {string} password selected password
 * @apiSuccessExample {json} Success:
 * HTTP/1.1 200 OK
 * {
 *   message: "Data saved successfully.",
 *   data: Newly created user object,
 *}
 * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 500 Internal Server Error
 * {
 *   "message": "We are having some error while completing your request. Please try again after some time."
 *   "error": actual error stack
 * }
 */
const store = async (req, res) => {
  try {
    const { firstName, lastName, email, password: plainPassword } = req.body;

    const password = bcrypt.hashSync(plainPassword);

    const user = await UserModel.create({
      firstName,
      lastName,
      email,
      password,
    });

    return res.status(200).json({
      success: true,
      message: "Data saved successfully.",
      data: user,
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
};

/**
 * Get only single record
 * @param { req, res }
 * @returns JsonResponse
 */
const details = async (req, res, next) => {
  try {
    // next() or
    return res.status(200).json({
      success: true,
      message: "Details fatched successfully.",
      data: {},
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        "We are having some error while completing your request. Please try again after some time.",
      error: error,
    });
  }
};

/**
 * update a record
 * @param { req, res }
 * @returns JsonResponse
 */
const update = async (req, res, next) => {
  try {
    // next() or
    return res.status(200).json({
      success: true,
      message: "Data updated successfully.",
      data: [],
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        "We are having some error while completing your request. Please try again after some time.",
      error: error,
    });
  }
};
/**
 * Destroy a record
 * @param { req, res }
 * @returns JsonResponse
 */
const destroy = async (req, res, next) => {
  try {
    // next() or
    return res.status(200).json({
      success: true,
      message: "Data deleted successfully.",
      data: [],
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        "We are having some error while completing your request. Please try again after some time.",
      error: error,
    });
  }
};

/**
 * Export as a single common js module
 */
module.exports = {
  index,
  store,
  details,
  update,
  destroy,
};
