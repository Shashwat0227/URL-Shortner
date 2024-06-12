const express = require("express");
const { Connectmongodb } = require("./connect");
const urlRoute = require("./routes/url");
const URL = require("./models/url");
const app = express();
const PORT = 8001;

Connectmongodb("mongodb://localhost:27017/url-shortner").then(() => {
  console.log("Connected to MongoDB");
});

app.use(express.json());
app.use("/url", urlRoute);

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: { visitHistory: { timestamp: Date.now() } },
    }
  );
  res.redirect(entry.redirectURL);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
