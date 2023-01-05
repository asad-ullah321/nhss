const mongoose = require("mongoose");
const { Schema } = mongoose;

const Lib = new Schema({
  student_id: { type: String, required: true },
  bookName: { type: String, required: true },
  date: { type: Date, required: true },
  dueDate: { type: Date, required: true },
  status: { type: String, required: true }

});

module.exports = mongoose.model("Lib", Lib);
