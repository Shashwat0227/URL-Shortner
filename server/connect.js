const mongoose = require("mongoose");

async function Connectmongodb(url) {
  return mongoose.connect(url);
}

module.exports = {
  Connectmongodb,
};
