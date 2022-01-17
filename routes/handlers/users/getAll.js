const { User } = require("../../../models");
const { apiResponse } = require("../../../responses/apiResponse");

module.exports = {
  getAll: async (req, res, next) => {
    try {
      const selectOption = {
        attributes: ["id", "name", "email", "role", "profession", "avatar"],
      };
      const users = await User.findAll(selectOption);

      const response = apiResponse(
        "Success get all users",
        "success",
        200,
        users
      );

      return res.sendStatus(200, "application/json", response);
    } catch (error) {
      next(error);
    }
  },
};
