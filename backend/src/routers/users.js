const express = require("express");
const router = express.Router();
const authMiddleWare = require("../middleware/auth2");
const { register, login, users } = require("../controllers/auth");
const User = require("../models/User");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/users/me").get(authMiddleWare, users);
// router.route("/users/me").get(users);

module.exports = router;
