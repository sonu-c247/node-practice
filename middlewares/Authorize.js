const Authorize = (req, res, next) => {
    const check = req.body;
    if (!check.email.match(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    )) {
        return res.status(403).send("Invalid not Email");
    
    }else if(!check.password.match(/^(?=.*?[A-Z])+(?=.*?[a-z])+(?=.*?[0-9])+(?=.*?[#?!@$%^&*-]).{8,}$/)){
        return res.status(403).send("password must be eight characters including one uppercase letter, one special character and alphanumeric characters");
    }
    else if(!check.firstname.match( /^[a-z]+$/i) || ! check.lastname.match( /^[a-z]+$/i) ){
        return res.status(403).send("name must be character");
    }
    else {
        console.log("data save successfully ");
        next()    
    }
}
module.exports = Authorize;