require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const refreshTokenRouter = require("./routes/refresh_token");
const { apiResponse } = require("./responses/apiResponse");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/user", usersRouter);
app.use("/refresh_token", refreshTokenRouter);

app.use(function (req, res, next) {
  const response = apiResponse("Not Found", "error", 404, {
    message: "API Endpoint Not Found",
  });
  return res.sendStatus(404, "application/json", response);
});

app.use(function (err, req, res, next) {
  console.log(err);

  const response = apiResponse("Internal server error", "error", 500, {
    message: "Something went wrong",
  });

  res.sendStatus(500, "application/json", response);
});
// Default API Response
app.response.sendStatus = function (statusCode, type, message) {
  this.type(type).status(statusCode).send(message);
};
module.exports = app;
