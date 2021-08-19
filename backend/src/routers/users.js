const express = require("express");
const router = express.Router();
const authMiddleWare = require("../middleware/auth");
const {
  register,
  login,
  logout,
  logoutall,
  users,
  user,
} = require("../controllers/auth");
const User = require("../models/User");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(authMiddleWare, logout);
router.route("/logoutall").post(authMiddleWare, logoutall);
router.route("/users").get(users);
router.route("/user").get(authMiddleWare, user);
// router.route("/users/me").get(users);

module.exports = router;
