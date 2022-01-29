"use strict";

/**
 * Get all record
 * @param { req, res }
 * @returns JsonResponse
 */
const signup = async (req, res, next) => {
  try {
        await validate(req,res,next)
    } catch (error) {
        return res.status(500).json({
        success: false,
        message:
            "We are having some error while completing your request. Please try again after some time.",
        error: error,
        });
    }
};
const validate = (req,res,next) => {
var errors = [];
const rules = {
    firstName: { string:true, required: true },
    lastName: { string:true, required: true },
    email: { string:true, 
            email:true,
            required: true,
            regex: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        },
    password: { minlength: 8, 
        upperCase:true, 
        required: true,
        regex: /(?=.*[a-z])(?=.*[A-Z])/
        }
    }
    for(var key in rules) {
        if(rules[key].required && !req.body[key])
            errors.push(key + ' is required');

        if(rules[key].minlength && req.body[key] && rules[key].minlength > (req.body[key]).length)
            errors.push(key + ' should have min '+rules[key].minlength + ' characters');

        if(rules[key].upperCase && req.body[key] && !rules[key].regex.test(req.body[key]))
            errors.push(key + ' should have atleast one uppercase & one lowercase');

        if(rules[key].email && req.body[key] && !rules[key].regex.test(req.body[key]))
            errors.push(key + ' is not valid');
    }
    if(errors.length>0){
        return res.status(200).json({
            errors:errors
            });
    }else{
        next()
    }
}


/**
 * Export as a single common js module
 */
module.exports = {
  signup
};
