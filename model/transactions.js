const mongoose = require("mongoose");

const transactionsSchema = new mongoose.Schema({
  randomTransactionId: { type: String, required: true },
  transactionId: { type: String, required: true },
  amountPaid: { type: String, required: true },
  userId: { type: String, required: true },
  playgroundId: { type: String, required: true },
  status: { type: String, required: true },
  bookedDate: { type: String, required: true },
  organisationName: { type: String, required: true },
  createdAt: { type: String, default: new Date() },
});

module.exports = mongoose.model("transactions", transactionsSchema);
