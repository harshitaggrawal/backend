const express = require("express");
const Controller = require("../Controller/LoginSignup");
const router = express.Router();

const { signup, login } = Controller;

router.post("/login", login).post("/signup", signup);

module.exports = router;
