const http = require("http");
const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Hello form ExpressJS",
  });
});

app.post("/", (req, res) => {
  res.status(200).json({
    message: "Hello form ExpressJS post method",
  });
});

app.put("/", (req, res) => {
  res.status(200).json({
    message: "Hello form ExpressJS put method",
  });
});

app.patch("/", (req, res) => {
  res.status(200).json({
    message: "Hello form ExpressJS patch method",
  });
});

app.delete("/", (req, res) => {
  res.status(200).json({
    message: "Hello form ExpressJS delete method",
  });
});

app.all("/posts", (req, res) => {
  res.status(200).json({
    message: "Hello form Posts all methods",
  });
});

const server = http.createServer(app);

server
  .listen(3000)
  .on("listening", () => {
    console.log(`Server is running on port ${server.address().port}`);
  })
  .on("error", (err) => {
    console.log(err);
  });
