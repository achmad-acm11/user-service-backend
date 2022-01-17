const { User } = require("../../../models");
const {
  apiResponse,
  apiResponseNotFound,
} = require("../../../responses/apiResponse");

module.exports = {
  getOne: async (req, res, next) => {
    try {
      const id = req.params.id;
      const selectOption = {
        attributes: ["id", "name", "email", "role", "profession", "avatar"],
      };

      const user = await User.findByPk(id, selectOption);

      if (!user) {
        return res.sendStatus(
          404,
          "application/json",
          apiResponseNotFound("User not found")
        );
      }

      const response = apiResponse("Success get user", "success", 200, user);

      return res.sendStatus(200, "application/json", response);
    } catch (error) {
      next(error);
    }
  },
};
