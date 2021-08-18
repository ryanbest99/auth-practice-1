require("dotenv").config({ path: "../../../config.env" });
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    var decoded = jwt.verify(token, process.env.JWT_SECRET);

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

// const auth = (req, res, next) => {
//   if (req.method == "POST") {
//     res.status(503).send("The service is currently under maintanance");
//   } else {
//     next();
//   }
// };

module.exports = auth;
