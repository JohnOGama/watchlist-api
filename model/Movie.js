const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MovieSchema = new Schema(
 
  {
    title: { type: String, required: true },
    slug: { type: String, required: true },
    stars: { type: Number, required: true, min: 0, max: 5 },
    year: { type: Number, required: true },
    description: { type: String, required: true },
    category: { type: Array },
    link: { type: String, required: true },
    thumbnail: { type: String, required: true },
  },
  { timestamp: true }
);

module.exports = mongoose.model("Movie", MovieSchema);
