const Validator = require("fastest-validator");
const bcrypt = require("bcrypt");
const { User } = require("../../../models");
const {
  apiResponse,
  apiResponseNotFound,
  apiResponseBadRequest,
  apiResponseConflict,
} = require("../../../responses/apiResponse");
const v = new Validator();

module.exports = {
  register: async (req, res, next) => {
    try {
      const schema = {
        name: "string|empty:false",
        email: "email|empty:false",
        password: "string|min:6",
        profession: "string|optional",
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

      if (user) {
        return res.sendStatus(
          409,
          "application/json",
          apiResponseConflict("Email already exists")
        );
      }

      const password = await bcrypt.hash(req.body.password, 10);

      const data = {
        name: req.body.name,
        email: req.body.email,
        password,
        profession: req.body.profession,
        role: "student",
      };

      const userNew = await User.create(data);

      const response = apiResponse("Success get user", "success", 200, {
        id: userNew.id,
      });

      return res.sendStatus(200, "application/json", response);
    } catch (error) {
      next(error);
    }
  },
};
