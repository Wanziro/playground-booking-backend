const mongoose = require("mongoose");

const bookedHoursSchema = new mongoose.Schema({
  from: { type: String, required: true },
  to: { type: String, required: true },
  playgroundId: { type: String, required: true },
  userId: { type: String, required: true },
  bookedDate: { type: String, required: true },
  transactionId: { type: String, required: true },
  createdAt: { type: String, default: new Date() },
});

module.exports = mongoose.model("bookedHours", bookedHoursSchema);
