const express = require("express");
const router = express.Router();
const usersHandler = require("./handlers/users");

/* GET users listing. */
router.get("/", usersHandler.getAll);
router.get("/:id", usersHandler.getOne);
router.post("/register", usersHandler.register);
router.put("/:id", usersHandler.update);
router.post("/login", usersHandler.login);
router.post("/logout", usersHandler.logout);

module.exports = router;
