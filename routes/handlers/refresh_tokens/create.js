const { RefreshToken, User } = require("../../../models");
const Validator = require("fastest-validator");
const v = new Validator();
const {
  apiResponseNotFound,
  apiResponse,
  apiResponseBadRequest,
} = require("../../../responses/apiResponse");
module.exports = {
  create: async (req, res, next) => {
    try {
      const userId = req.body.user_id;
      const refreshToken = req.body.refresh_token;

      const schema = {
        refresh_token: "string",
        user_id: "number",
      };

      const validate = v.validate(req.body, schema);

      if (validate.length) {
        return res.sendStatus(
          400,
          "application/json",
          apiResponseBadRequest(validate)
        );
      }
      const user = await User.findByPk(userId);

      if (!user) {
        return res.sendStatus(
          404,
          "application/json",
          apiResponseNotFound("User not found")
        );
      }

      const createRefreshToken = await RefreshToken.create({
        token: refreshToken,
        user_id: user.id,
      });

      const response = apiResponse("Success create token", "success", 200, {
        id: createRefreshToken.id,
      });

      return res.sendStatus(200, "application/json", response);
    } catch (error) {
      next(error);
    }
  },
};
