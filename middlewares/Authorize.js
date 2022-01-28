const Authorize= (req, res, next) => {
    const check = req.body;
    if (check.email.match(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    )) {
        console.log(check.email, " is valid");
        next()
    } else {
        console.log(check.email, " is not valid");
        return res.status(403).send("Invalid Email");
    }
} 
module.exports = Authorize;