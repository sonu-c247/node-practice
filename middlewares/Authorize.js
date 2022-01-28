"use strict";

/**
 * Get all record
 * @param { req, res }
 * @returns JsonResponse
 */
const parseHtml = async (req, res, next) => {
  try {
    // if(req.body.isArray()){
    //  console.log(req.body)
    // }else{
      for(var key in req.body) {
        if(req.body.hasOwnProperty(key)){
          req.body[key] = req.body[key].replace(/<[^>]*>?/gm, '')
          console.log(req.body[key]);
        }
      }
    // }
    next();
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
  parseHtml
};
