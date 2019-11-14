require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
app.use(bodyParser.json());

// mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/room", {
// On use  MONGODB_URI de .env si celui installe par heroku n existe pas
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const roomRoute = require("./routes/room");
const userRoute = require("./routes/user");

app.use(roomRoute);
app.use(userRoute);

app.listen(process.env.PORT || 3000, () => {
  console.log("Server started");
});
