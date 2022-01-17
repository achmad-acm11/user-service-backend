const { getAll } = require("./getAll");
const { getOne } = require("./getOne");
const { register } = require("./register");
const { update } = require("./update");
const { login } = require("./login");
const { logout } = require("./logout");

module.exports = {
  getAll,
  getOne,
  register,
  update,
  login,
  logout,
};
