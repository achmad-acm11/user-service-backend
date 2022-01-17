const express = require("express");
const router = express.Router();
const handleRefreshToken = require("./handlers/refresh_tokens");

router.get("/", handleRefreshToken.getToken);
router.post("/", handleRefreshToken.create);

module.exports = router;
