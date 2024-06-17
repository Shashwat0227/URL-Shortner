const User = require("../models/users");

async function HandleUserSignUp(req, res) {
  const { name, email, password } = req.body;
  await User.create({ name, email, password });
  res.redirect("/");
}
async function HandleUserLogin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user) res.render("login", { error: "Invalid email or password" });
  res.redirect("/");
}
module.exports = { HandleUserSignUp, HandleUserLogin };
