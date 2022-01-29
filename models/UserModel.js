"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");


//create  a schema

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
    
        email:{
            type:String,
            required:true,
            unique:[ true, "email is already prsent"],
            validate(value){
                if(!validator.isEmail(value)){
                    throw new Error("invelid")
                }
            }
        
    },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    phone:{
        type:Number,
        min:10,
        required:true,
        unique:true
    },
    
    
})

//we will create new mongoose.Collection
 
const student= new mongoose.model('student', userSchema);//student is a collection name
module.exports= student;//file name export to student.js


/*


const UserModelSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true ,
    unique:[ true, "email is already prsent"],
    validate(value){
        if(!validator.isEmail(value)){
            throw new Error("invelid")
        }
    }},
    
    phone:{type:Number,min:10, required:true, unique:true
  },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

UserModelSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

UserModelSchema.pre("update", function () {
  this.update({}, { $set: { updatedAt: Date.now() } });
});

UserModelSchema.pre("findOneAndUpdate", function () {
  this.update({}, { $set: { updatedAt: Date.now() } });
});

module.exports = mongoose.model("user", UserModelSchema);
*/