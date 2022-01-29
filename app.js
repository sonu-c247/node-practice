const http = require("http");
const express = require('express')
require("./db/conn");
const routes = require("./routes");
const student = require("./models/UserModel");//connect schema and models
const middle = require("./middlewares/Authorize")//connect middlewares
const app = express();
app.use(express.json());
app.use(middle.Validation);//middlewares
app.use(middle.signUp);//minddlewarws






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

app.use("/v1", routes);

const server = http.createServer(app);

server
  .listen(3001)
  .on("listening", () => {
    console.log(`Server is running on port ${server.address().port}`);
  })
  .on("error", (err) => {
    console.log(err);
  });
