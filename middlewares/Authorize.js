"use strict";

/**
 * Get all record
 * @param { req, res }
 * @returns JsonResponse
 */
const parseHtml = async (req, res, next) => {
  try {
    (req.body && req.body.name) ? req.body.name.replace(/<[^>]*>?/gm, '') : ''
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
