const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

module.exports = mongoose.model('Project', Schema({
  color: String,
  name: String,
}));
