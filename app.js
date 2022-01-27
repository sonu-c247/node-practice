const http = require("http");
const express = require("express");
const routes = require("./routes");

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
  .listen(3000)
  .on("listening", () => {
    console.log(`Server is running on port ${server.address().port}`);
  })
  .on("error", (err) => {
    console.log(err);
  });
