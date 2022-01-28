"use strict";
const fs = require("fs");
const path = require("path");

const basename = path.basename(__filename);

let middleware = {};
// read all files of middleware directory
fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file));
    middleware[path.basename(file, ".js")] = model;
  });

module.exports = middleware;
