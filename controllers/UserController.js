"use strict";
const { UserModel } = require("../models");

/**
 * Get all record
 * @param { req, res }
 * @returns JsonResponse
 */
const index = async (req, res) => {
  try {
    const getData = await UserModel.find();
      return res.status(200).json({
      success: true,
      message: "Users fetched Successfully.",
      data: getData
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
const store = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    await UserModel.create({
      firstName,
      lastName,
      email,
      password,
    });

    return res.status(200).json({
      success: true,
      message: "Data saved successfully.",
      data: [req.body]
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
const details = async (req, res) => {
  try {
      const userDetails = await UserModel.findOne({_id: req.params.id});    
      return res.status(200).json({
      success: true,
      message: "Details fatched successfully.",
      data: userDetails
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
const update = async (req, res) => {
  try {
    const updateUser = await UserModel.findByIdAndUpdate(req.params.id , req.body , {
      new : true
    });
    return res.status(200).json({
      success: true,
      message: "Data updated successfully.",
      data: updateUser
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
const destroy = async (req, res) => {
  try {
    // next() or
      const deleteUser = await UserModel.findByIdAndDelete(req.params.id);
      return res.status(200).json({
          success: true,
          message: "Data deleted successfully.",
          data : deleteUser
      });
  }catch(error) {
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
