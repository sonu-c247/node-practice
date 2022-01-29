const http = require("http");
const express = require("express");
const routes = require("./routes");
const  Mongoose  = require("mongoose");


const app = express();
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
const server = http.createServer(app);

Mongoose.connect('mongodb://localhost:27017/node_practice')
.then(()=>{
  console.log("Data base connected successfully...")
})
.catch((e)=>{
  console.log(e)
})
server
  .listen(3000)
  .on("listening", () => {
    console.log(`Server is running on port ${server.address().port}`);
  })
  .on("error", (err) => {
    console.log(err);
  });
