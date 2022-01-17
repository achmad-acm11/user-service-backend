const Validator = require("fastest-validator");
const bcrypt = require("bcrypt");
const { User } = require("../../../models");
const {
  apiResponse,
  apiResponseNotFound,
  apiResponseBadRequest,
} = require("../../../responses/apiResponse");
const v = new Validator();

module.exports = {
  login: async (req, res, next) => {
    try {
      const schema = {
        email: "email|empty:false",
        password: "string|empty:false",
      };

      const validate = v.validate(req.body, schema);

      if (validate.length) {
        return res.sendStatus(
          400,
          "application/json",
          apiResponseBadRequest(validate)
        );
      }

      const user = await User.findOne({
        where: {
          email: req.body.email,
        },
      });

      if (!user) {
        return res.sendStatus(
          404,
          "application/json",
          apiResponseNotFound("User not found")
        );
      }

      const isValidPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (!isValidPassword) {
        return res.sendStatus(
          404,
          "application/json",
          apiResponseNotFound("User not found")
        );
      }

      const response = apiResponse("Success get user", "success", 200, {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        profession: user.profession,
      });

      return res.sendStatus(200, "application/json", response);
    } catch (error) {
      next(error);
    }
  },
};
