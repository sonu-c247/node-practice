const http = require("http");
const express = require("express");
const mongoose = require("mongoose");
const { engine } = require("express-handlebars");
var bodyParser = require('body-parser');
const routes = require("./routes");
const path = require("path");
const fs = require("fs");
const handlebar = require("handlebars");
const { default: axios } = require("axios");
const { Validations } = require("./middlewares");
const { UserValidations } = require("./validations");

const app = express();

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine(
  ".hbs",
  engine({
    extname: ".hbs",
    defaultLayout: "main",
    helpers: {
      getFormattedNumber: (number) => {
        return new Intl.NumberFormat("en-IN", {
          maximumSignificantDigits: 3,
        }).format(number);
      },
      truncate: (str, len) => {
        // truncate string
        if (str.length > len && str.length > 0) {
          return str.substring(0, len) + "...";
        }
        return str;
      },
    },
  })
);
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "views"));

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
// app.use(middlewares);

app.get("/", async (req, res) => {
  return res.render("home/index");
});

app.get("/login", async (req, res) => {
  return res.render("login/index");
});
app.get("/signup", async (req, res) => {
  return res.render("signup/index");
});
app.post("/postSignup", async (req, res) => {
  console.log(req.body.firstName);
 // return res.render("signup/index");
});

app.get("/post/:id", async (req, res) => {
  const { data } = await axios.get(
    `https://jsonplaceholder.typicode.com/posts/${req.params.id}`
  );
  const { data: comments } = await axios.get(
    `https://jsonplaceholder.typicode.com/posts/${req.params.id}/comments`
  );
  const layout = fs
    .readFileSync(path.join(__dirname, "views/layouts/main.hbs"))
    .toString();

  const fileData = fs
    .readFileSync(path.join(__dirname, "views/post/details.hbs"))
    .toString();
  const template = handlebar.compile(layout);
  const fileTemplate = handlebar.compile(fileData);
  const html = template({
    body: fileTemplate({
      postDetails: data,
      comments,
    }),
  });

  return res.send(html);
});

mongoose
  .connect('mongodb://127.0.0.1:27017/node_basics')
  .then(() => console.log("Database connected successfully"))
  .catch(console.log);

const server = http.createServer(app);

server
  .listen(3000)
  .on("listening", () => {
    console.log(`Server is running on port ${server.address().port}`);
  })
  .on("error", (err) => {
    console.log(err);
  });
