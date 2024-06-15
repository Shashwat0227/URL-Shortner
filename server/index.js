const express = require("express");
const { Connectmongodb } = require("./connect");
const urlRoute = require("./routes/url");
const URL = require("./models/url");
const path = require("path");
const app = express();
const staticRouter = require("./routes/staticRouter");
const PORT = 8001;

Connectmongodb("mongodb://localhost:27017/url-shortner").then(() => {
  console.log("Connected to MongoDB");
});

app.set("view engine", "ejs"); // Set the view engine to ejs
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/url", urlRoute);
app.use("/", staticRouter);

app.get("/url/:shortId", async (req, res) => {
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
