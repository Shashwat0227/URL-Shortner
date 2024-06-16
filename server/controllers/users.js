const User = require("../models/users");

async function HandleUserSignUp(req, res) {
  const { name, email, password } = req.body;
  await User.create({ name, email, password });
  res.render("home");
}

module.exports = { HandleUserSignUp };
