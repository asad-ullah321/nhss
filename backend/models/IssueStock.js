const mongoose = require("mongoose");
const { Schema } = mongoose;

const issueStocks = new Schema({
  stock: { type: String, required: true },
  quantity: { type: Number, required: true },
  To: { type: String, required: true },
  date: { type: Date, required: true },
  description: { type: String, required: true },
  issuedby: { type: String, required: true },
  status: { type: String, required: true }

});

module.exports = mongoose.model("issueStocks", issueStocks);
