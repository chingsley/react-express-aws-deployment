var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
require("dotenv").config();

const indexRouter = require("./routes");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/*", (req, res) => {
  return res.status(404).json({ error: "route not found" });
});
app.use((error, req, res, next) => {
  if (typeof error === "object") {
    return res.status(500).json({ error: error.message });
  } else {
    return res.status(500).json({ error });
  }
});

module.exports = app;
