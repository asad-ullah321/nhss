const mongoose = require('mongoose');
const { Schema } = mongoose;

const Attendances = new Schema({
  
  student_id: {
    type: String,
    required: true,
    
  },
  sname: {
    type: String,
    required: true,
  },
  class: {
    type: Number,
    required: true
  },    
  date: {
    type: Date,
    required: true,
},
attendance: {
    type: String,
    required: true,
 }

});


module.exports = mongoose.model('Attendances', Attendances);