const { UserModel } = require("../models");

const Authorize = async(req, res, next) => {
    const check = req.body;
    const existingUser = await UserModel.findOne({ email: check.email })
    if(existingUser)
    {
        res.status(403).send(`${req.body.email} is already taken`);
    }
    else if(!check.firstName.match(/^[a-z]+$/i))
    {
        return res.status(403).send("FirstName is required");
    }
    else if(!check.lastName.match(/^[a-z]+$/i))
    {
        return res.status(403).send("LastName is required");
    }
    else if(!check.email.match(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i))
    {
        return res.status(403).send("Invalid not Email");
    }
    else if(!check.password.match(/^(?=.*?[A-Z])+(?=.*?[a-z])+(?=.*?[0-9])+(?=.*?[#?!@$%^&*-]).{8,}$/))
    {
        return res.status(403).send("Password must be 8 characters including one uppercase letter, one special character and alphanumeric characters");
    }
    else{
        console.log("UserData Saved Successfully!");
        next()    
    }
}

module.exports = Authorize;