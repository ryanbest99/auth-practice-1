const User = require("../models/User");

exports.register = async (req, res) => {
  //   res.send("register successful");
  const { username, email, password } = req.body;

  try {
    const newUser = await User.create({ username, email, password });
    const token = await newUser.generateAuthToken();
    res.status(200).json({ success: true, newUser });
  } catch (err) {
    res.status(500).json({ success: false, err: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findByCredentials(email, password);
    const token = await user.generateAuthToken();

    res.status(200).json({ success: true, user, token });
  } catch (err) {
    res.status(500).json({ success: false, err: err.message });
  }
};

exports.users = async (req, res) => {
  try {
    // const users = await User.find({});
    // res.status(200).json({ success: true, users });
    res.send(req.user);
  } catch (err) {
    res.status(500).json({ success: false, err: err.message });
  }
};
