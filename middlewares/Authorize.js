const Authorize = (req, res, next) => {
    const check = req.body;
    if (!check.password.match(/^(?=.*?[A-Z])+(?=.*?[a-z])+(?=.*?[0-9])+(?=.*?[#?!@$%^&*-]).{8,}$/)) {
        console.log(check.password, "is not valid");
        return res.status(403).send("invalid password");


    }else if(!check.firstName.match(/^[a-z]+$/i))

        {
          console.log(check.firstName,"is not valid");
           return res.status(403).send("invalid firstName");
    } else if (!check.lastName.match(/^[a-z]+$/i )){

        console.log(check.lastName,"is not valid");
        return res.status(403).send("invalid firstName");

    }

    
    else {
        console.log("Data save successfully");
        next()
    }
}


module.exports = Authorize;  