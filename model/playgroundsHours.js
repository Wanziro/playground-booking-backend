const mongoose = require("mongoose");

const playgroundHoursSchema = new mongoose.Schema({
  from: { type: String, required: true },
  to: { type: String, required: true },
  playgroundId: { type: String, required: true },
  createdAt: { type: String, default: new Date() },
});

module.exports = mongoose.model("playgroundHours", playgroundHoursSchema);
