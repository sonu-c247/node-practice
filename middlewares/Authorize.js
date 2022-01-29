const { UserModel } = require('../models')

const Authorize =async (req, res, next) => {
    const check = req.body;
    const existingUser = await UserModel.findOne({
           email: check.email
        })
    if(existingUser){
        console.log("Email Is Already Existing..!")
        return res.status(403).send("Email Is Already Existing..!");
    }
    else if (!check.email.match(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    )) {
        console.log("Invalid not Email")
        return res.status(403).send("Invalid not Email");
    
    }else if(!check.password.match(/^(?=.*?[A-Z])+(?=.*?[a-z])+(?=.*?[0-9])+(?=.*?[#?!@$%^&*-]).{8,}$/)){
        console.log("Password Error")
        return res.status(403).send("password must be eight characters including one uppercase letter, one special character and alphanumeric characters");
    }
    else if(!check.firstname.match(/^[a-z]+$/i)){
        console.log("First Name Must be Character Without Space")
        return res.status(403).send("First Name Must be Character Without Space");
    }
    else if(!check.lastname.match(/^[a-z]+$/i)){
        console.log("Last Name Must be Character Without Space")
        return res.status(403).send("Last Name Must be Character Without Space");
    }
    else {
        console.log("data save successfully ");
        next()    
    }
}
module.exports = Authorize;