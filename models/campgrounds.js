const mongoose = require("mongoose");
const Review = require("./review");
const { Schema } = mongoose;

const imageShema = new Schema({
  url: String,
  falename: String,
});

imageShema.virtual("thumbnail").get(function () {
  return this.url.replace("/upload", "/upload/w_200");
});

const opts = { toJSON: { virtuals: true } };

const campgroundsSchema = new Schema(
  {
    title: String,
    images: [imageShema],
    geometry: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    price: Number,
    description: String,
    location: String,
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
  },
  opts
);

campgroundsSchema.virtual("properties.popupMarkup").get(function () {
  return `<strong><a href="/campgrounds/${
    this._id
  }"> ${this.title} </a></strong>
  <p>${this.description.substring(0, 20)}...</p>`;
});

campgroundsSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await Review.deleteMany({
      _id: {
        $in: doc.reviews,
      },
    });
  }
});

module.exports = mongoose.model("Campground", campgroundsSchema);
