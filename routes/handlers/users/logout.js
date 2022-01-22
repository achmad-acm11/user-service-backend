const Validator = require("fastest-validator");
const bcrypt = require("bcrypt");
const { User, RefreshToken } = require("../../../models");
const {
  apiResponse,
  apiResponseNotFound,
  apiResponseBadRequest,
} = require("../../../responses/apiResponse");
const v = new Validator();

module.exports = {
  logout: async (req, res, next) => {
    try {
      const userId = req.body.user_id;

      const user = await User.findByPk(userId);

      if (!user) {
        return res.sendStatus(
          404,
          "application/json",
          apiResponseNotFound("User not found")
        );
      }

      await RefreshToken.destroy({
        where: {
          user_id: user.id,
        },
      });

      const response = apiResponse("Success logout user", "success", 200, {
        message: "User Success logout",
      });

      return res.sendStatus(200, "application/json", response);
    } catch (error) {
      next(error);
    }
  },
};
