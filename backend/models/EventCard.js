const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventCardSchema = new Schema({
  imgSrc: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("EventCard", EventCardSchema);
