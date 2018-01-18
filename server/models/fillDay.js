const mongoose = require('mongoose');

const Schema = mongoose.Schema;

module.exports = mongoose.model('FillDay', Schema({
  number: Number,
  day: String,
  month: {
    name: String,
    number: Number,
  },
  status: String,
  color: String,
  hours: Number,
  year: Number,
}));
