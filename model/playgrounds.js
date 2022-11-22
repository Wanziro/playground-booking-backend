const mongoose = require("mongoose");

const playgroundSchema = new mongoose.Schema({
  title: { type: String, required: true },
  summary: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  images: { type: [], required: true },
  status: { type: String, required: true, default: "Active" },
  createdAt: { type: String, default: new Date() },
});

module.exports = mongoose.model("playgrounds", playgroundSchema);
