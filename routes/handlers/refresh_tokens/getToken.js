const { RefreshToken } = require("../../../models");
const {
  apiResponseNotFound,
  apiResponse,
} = require("../../../responses/apiResponse");
module.exports = {
  getToken: async (req, res, next) => {
    try {
      const refreshToken = req.query.refresh_token;
      const token = await RefreshToken.findOne({
        where: {
          token: refreshToken,
        },
      });

      if (!token) {
        return res.sendStatus(
          404,
          "application/json",
          apiResponseNotFound("Invalid Token")
        );
      }
      const response = apiResponse("Success get token", "success", 200, {
        token: token,
      });

      return res.sendStatus(200, "application/json", response);
    } catch (error) {
      next(error);
    }
  },
};
