const mongoose = require("mongoose");
const { Schema } = mongoose;

const reviewsSchema = new Schema({
  body: String,
  rating: Number,
});

module.exports = mongoose.model("Review", reviewsSchema);
