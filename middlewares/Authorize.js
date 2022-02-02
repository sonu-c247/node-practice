const validation = (req, res, next) => {
  console.log(req.body);
    const firstName=req.body["firstName"];
    const lastName=req.body.lastName;
    const email=req.body.email;
    const password=req.body.password;
    let error=[];

    if(!firstName.match(/^[a-z]+$/i))
    { 
       error.push("your first name is invalid.");
     
    }  
    if (!lastName.match(/^[a-z]+$/i )){
       error.push("your last name is invalid");
      

    }
    if(!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){
          error.push("your email is invalid.");
    
    }
    if (!password.match(/^(?=.*?[A-Z])+(?=.*?[a-z])+(?=.*?[0-9])+(?=.*?[#?!@$%^&*-]).{8,}$/)) {
         error.push("your password is invalid.");
   
    }
    if(!Object.keys(error).length==0){
       return res.status(422).send(error);
    }

    next();
    
}
module.exports = {
    validation
  };