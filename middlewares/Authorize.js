"use strict";

/**
 * Get all record
 * @param { req, res }
 * @returns JsonResponse
 */
const signUpAuth = async (req, res, next) => {
  try {
    console.log('LOGGED')
    // next();
    // next() or
    return res.status(200).json({
      success: true,
      message: "Posts fetched successfully.",
      data: {hello:'prem'},
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
module.exports = {
    signUpAuth
  };