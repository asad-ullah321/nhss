const mongoose = require("mongoose");
const { Schema } = mongoose;

const Fines = new Schema({
  student_id: { type: String, required: true },
  amount: { type: Number, required: true },
  reason: { type: String, required: true },
  date: { type: Date, required: true },
  dueDate: { type: Date, required: true },
  status: { type: String, required: true }

});

module.exports = mongoose.model("Fines", Fines);
