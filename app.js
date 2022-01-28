const http = require("http");
const express = require('express')
const bodyParser = require('body-parser')
const { validate, ValidationError, Joi } = require('express-validation')

const login = {
  body: Joi.object({
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .regex(/[a-zA-Z0-9]{3,30}/)
      .required(),
  }),
}

const app = express();
app.use(bodyParser.json())

app.post('/login', validate(login, {}, {}), (req, res) => {
  res.json(200)
  console.log("email and passwaord post sucessucfully")

})

app.use(function(err, req, res, next) {
  if (err instanceof ValidationError) {
    console.log("invalid data");
    return res.status(err.statusCode).json(err)
    
  }

  return res.status(500).json(err)
  
})





/*
const http = require("http");
const express = require("express");
const routes = require("./routes");
const middlewares = require("./middlewares");

const app = express();

/**
 * Status codes:
 * 200 - OK
 * 201 - Created
 * 400 - Bad Request
 * 401 - Unauthorized
 * 403 - Forbidden
 * 422 - Unprocessable Entity
 * 500 - Internal Server Error
 */

//app.use("/v1", routes);

const server = http.createServer(app);

server
  .listen(3001)
  .on("listening", () => {
    console.log(`Server is running on port ${server.address().port}`);
  })
  .on("error", (err) => {
    console.log(err);
  });
