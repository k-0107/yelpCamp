const mongoose = require("mongoose");
const cities = require("./cities");
const { descriptors, places } = require("./seedHelpers");
const Campground = require("../models/campgrounds");

mongoose
  .connect("mongodb://localhost:27017/yelp-camp24", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("MongoDBコネクションOK!!");
  })
  .catch((err) => {
    console.log("MongoDBコネクションエラー!!");
    console.log(err);
  });

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const randomCityIndex = Math.floor(Math.random() * cities.length);
    const price = Math.floor(Math.random() * 2000) + 1000;
    const camp = new Campground({
      author: "65b8dd8ab538a6268e90e6e1",
      location: `${cities[randomCityIndex].prefecture}${cities[randomCityIndex].city}`,
      title: `${sample(descriptors)}・${sample(places)}`,
      images: [
        {
          url: "https://res.cloudinary.com/dth39op6m/image/upload/v1706681119/YelpCamp/ceyiykq7dbqhrnu6fzuq.jpg",
          filename: "YelpCamp/ceyiykq7dbqhrnu6fzuq",
        },
        {
          url: "https://res.cloudinary.com/dth39op6m/image/upload/v1706681119/YelpCamp/cxq3jbt5xlqhbawu0h6g.jpg",
          filename: "YelpCamp/cxq3jbt5xlqhbawu0h6g",
        },
        {
          url: "https://res.cloudinary.com/dth39op6m/image/upload/v1706681120/YelpCamp/xbujdmmkwweazqveuo3i.jpg",
          filename: "YelpCamp/xbujdmmkwweazqveuo3i",
        },
      ],
      description:
        "木曾路はすべて山の中である。あるところは岨づたいに行く崖の道であり、あるところは数十間の深さに臨む木曾川の岸であり、あるところは山の尾をめぐる谷の入り口である。一筋の街道はこの深い森林地帯を貫いていた。東ざかいの桜沢から、西の十曲峠まで、木曾十一宿はこの街道に添うて、二十二里余にわたる長い谿谷の間に散在していた。道路の位置も幾たびか改まったもので、古道はいつのまにか深い山間に埋もれた。",
      price: price,
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
