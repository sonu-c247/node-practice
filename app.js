const http = require("http");
const express = require("express");
const routes = require("./routes");
const middlewares = require("./middlewares");
const mongoose = require("mongoose");

const app = express();
console.log("middlewares Data===",middlewares.Authorize.signUpAuth);
app.use(express.json());
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
app.use(middlewares.Authorize.signUpAuth);
mongoose
  .connect("mongodb://localhost:27017/node_basics")
  .then(() => console.log("Database connected successfully"))
  .catch(console.log);

const server = http.createServer(app);

server
  .listen(3001)
  .on("listening", () => {
    console.log(`Server is running on port ${server.address().port}`);
  })
  .on("error", (err) => {
    console.log(err);
  });
