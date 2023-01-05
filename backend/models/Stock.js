const mongoose = require("mongoose");
const { Schema } = mongoose;

const Stocks = new Schema({
  stock: { type: String, required: true },
  quantity: { type: Number, required: true },
  location: { type: String, required: true },
  date: { type: Date, required: true },
  description: { type: String, required: true },
  addedBy: { type: String, required: true }
});

module.exports = mongoose.model("Stocks", Stocks);
