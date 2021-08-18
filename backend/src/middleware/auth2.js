require("dotenv").config({ path: "../../../config.env" });
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const auth2 = async (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  try {
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!user) {
      throw new Error("Invalid Credentials");
    }

    req.user = user;

    next();
  } catch (err) {
    res.status(400).send({ err: err.message });
  }
};

module.exports = auth2;
