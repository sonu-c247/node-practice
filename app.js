const http = require("http");
const express = require("express");
const routes = require("./routes");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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

// mongoose.connect("mongodb://localhost:27017/node_basics", function(err, db) {
//   if (err) throw err;
//   console.log("Database created!");

// });

// mongoose
//   .connect("mongodb://localhost:27017/node_basics")
//   .then(() => console.log("Database connected successfully"))
//   .catch(console.log);

const server = http.createServer(app);

server
  .listen(3000)
  .on("listening", () => {
    console.log(`Server is running on port ${server.address().port}`);
  })
  .on("error", (err) => {
    console.log(err);
  });
