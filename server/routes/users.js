const express = require("express");
const { HandleUserSignUp } = require("../controllers/users");
const router = express.Router();

router.post("/", HandleUserSignUp);

module.exports = router;
