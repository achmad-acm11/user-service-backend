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
  update: async (req, res, next) => {
    try {
      const schema = {
        name: "string|empty:false",
        email: "email|empty:false",
        password: "string|min:6",
        profession: "string|optional",
        avatar: "string|optional",
      };

      const validate = v.validate(req.body, schema);

      if (validate.length) {
        return res.sendStatus(
          400,
          "application/json",
          apiResponseBadRequest(validate)
        );
      }
      const id = req.params.id;
      const user = await User.findByPk(id);

      if (!user) {
        return res.sendStatus(
          404,
          "application/json",
          apiResponseNotFound("User not found")
        );
      }

      const email = req.body.email;
      if (email) {
        const userEmail = await User.findOne({
          where: {
            email: email,
          },
        });
        if (userEmail && email !== user.email) {
          return res.sendStatus(
            409,
            "application/json",
            apiResponseConflict("Email already exists")
          );
        }
      }

      const password = await bcrypt.hash(req.body.password, 10);

      const userUpdate = await user.update({
        name: req.body.name,
        email,
        password,
        profession: req.body.profession,
        avatar: req.body.avatar,
      });

      const response = apiResponse("Success update user", "success", 200, {
        id: userUpdate.id,
        name: userUpdate.name,
        email: userUpdate.email,
        profession: userUpdate.profession,
        avatar: userUpdate.avatar,
      });

      return res.sendStatus(200, "application/json", response);
    } catch (error) {
      next(error);
    }
  },
};
