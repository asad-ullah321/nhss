const mongoose = require('mongoose');
const { Schema } = mongoose;

const Students = new Schema({
  student_id: {
    type: String,
    required: true,
    unique: true  // <-- create a unique index 
  },
  sname: {
    type: String,
    required: true,
  },
  class: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Students', Students);