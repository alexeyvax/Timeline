const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

module.exports = mongoose.model('User', Schema({
  login: String,
  passwd: String,
  employees: [{ type: ObjectId, ref: 'Employee' }],
  projects: [{ type: ObjectId, ref: 'Project' }],
}));
