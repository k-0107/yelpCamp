const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const campgroundsSchema = new Schema({
  title: String,
  price: Number,
  description: String,
  location: String,
});

module.exports = mongoose.model("Campground", campgroundsSchema);
