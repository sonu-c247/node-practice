"use strict";
const { UserModel } = require("../models");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

/**
 * Get all record
 * @param { req, res }
 * @returns JsonResponse
 */
const index = async (req, res) => {
  try {
    const users = await UserModel.find();
    return res.status(200).json({
      success: true,
      message: "Users fetched successfully.",
      data: users,
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
    const { firstName, lastName, email, password: plainPassword } = req.body;

    const password = bcrypt.hashSync(plainPassword);
    const userData = await UserModel.create({
      firstName,
      lastName,
      email,
      password,
    });

    return res.status(200).json({
      success: true,
      message: "Data saved successfully.",
      data: userData,
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
    // next() or
    let id = req.params.id;
    const userDetails  = UserModel.where({ _id: id,firstName:'prem' });
    userDetails.findOne(function (err, UserModel) {
      if (UserModel!=null) {
        return res.status(200).json({
          success: true,
          message: "Details fatched successfully.",
          data: UserModel ,
        });
      }else{
        return res.status(201).json({
          success: false,
          message: "Details not found.",
          data: '' ,
        });
      }
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
    const id = req.params.id;
    const dataToUpdate = { firstName: 'jason',lastName:'John' }
    UserModel.findByIdAndUpdate(id, dataToUpdate,{ upsert: false },function(err,updatedData){
      if(err) {
        return res.status(201).json({
          success: true,
          message: "Somthing went wrong.",
          data: '',
        });
      }else{
        return res.status(200).json({
          success: true,
          message: "Data updated successfully.",
          data: updatedData,
        });
      }
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
    const deleteStatus = await UserModel.deleteOne({ _id:req.params.id  });
    if(deleteStatus.deletedCount==1){
      return res.status(200).json({
        success: true,
        message: "Data deleted successfully.",
        data: deleteStatus.deletedCount,
      });
    }else{
      return res.status(200).json({
        success: true,
        message: "Somethig went wrong.",
        data: deleteStatus.deletedCount,
      });
    }
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