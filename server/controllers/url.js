const shortid = require("shortid");
const URL = require("../models/url");

async function HandleGenerateNewShortURL(req, res) {
  const body = req.body;
  if (!body.url) {
    return res.status(400).json({ error: "URL is required" });
  }

  const shortID = shortid();
  await URL.create({
    shortId: shortID,
    redirectURL: req.body.url,
    visitHistory: [],
  });
  return res.render("home", { id: shortID });
}

module.exports = { HandleGenerateNewShortURL };
