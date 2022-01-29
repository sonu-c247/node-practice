const express = require("express");
const student = require("../models/UserModel");
/*
router.get("/myrouter",(req,res)=> {
    res.send("hello whats app");
})

*/


const Validation = (req, res, next) => {
  const validate = req.body;
  if(!validate.firstName.match(/^[a-z]+$/i))
  {
      return res.status(403).send("FirstName field is required");
  }
  else if(!validate.lastName.match(/^[a-z]+$/i))
  {
      return res.status(403).send("lastName field is  required");
  }
  else if(!validate.email.match(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i))
  {
      return res.status(403).send("email is invalid");
  }
  else if(!validate.password.match(/^(?=.*?[A-Z])+(?=.*?[a-z])+(?=.*?[0-9])+(?=.*?[#?!@$%^&*-]).{8,}$/))
  {
      return res.status(403).send("required 8 characters, one uppercase letter, one special character and alphanumeric characters");
  }
  else{
    
      console.log(" all in correct formate");
      next()    
  }
}



const signUp = async (req, res) => {
  try {
    // next() or
    const user=new student(req.body);
        const createUser =await user.save();
        res.status(201).send(createUser);
        console.log("data saved!!")
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        "We are having some error while completing your request. Please try again after some time.",
      error: error,
      
    });
  }
};

module.exports= {
  signUp,Validation} ;
