"use strict";
const { UserModel } = require('../models')
/**
 * Get all record
 * @param { req, res }
 * @returns JsonResponse
 */
const index = async (req, res, next) => {
  try {
    const getdata = await UserModel.find()
    return res.status(200).json({
      success: true,
      message: "Users fetched successfully.",
      data: [getdata],
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
 * Create a record
 * @param { req, res }
 * @returns JsonResponse
 */
const store = async (req, res, next) => {
  try {
    const { firstname, lastname, email, password } = req.body;
    await UserModel.create({
      firstname,
      lastname,
      email,
      password
    });
    return res.status(200).json({
      success: true,
      message: "Data saved successfully.",
      data: [req.body],
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
 * Get only single record
 * @param { req, res }
 * @returns JsonResponse
 */
const details = async (req, res, next) => {
  try {
    const { email } = req.params
    const getOneuser = await UserModel.findOne({ email })
    return res.status(200).json({
      success: true,
      message: "Details fatched successfully.",
      data: {getOneuser},
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
    const updateUser = await UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
    return res.status(200).json({
      success: true,
      message: "Data updated successfully.",
      data: [updateUser],
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

   const deletedUser=  await UserModel.findByIdAndDelete(req.params.id)
    return res.status(200).json({
      success: true,
      message: "Data deleted successfully.",
      data: [deletedUser],
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
