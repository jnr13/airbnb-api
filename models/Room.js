const mongoose = require("mongoose");

const Room = new mongoose.model("Room", {
  title: String,
  description: String,
  photos: [String],
  price: Number,
  ratingValue: {
    type: Number,
    default: null
  },
  reviews: {
    type: Number,
    default: 0
  },
  city: String,
  loc: {
    type: [Number], // Longitude et latitude
    index: "2dsphere" // Créer un index geospatial https://docs.mongodb.com/manual/core/2dsphere/
  }
});

module.exports = Room;
