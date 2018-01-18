const Employee = require('../models/Employee');

module.exports.save = async (req, res) => {
  try {
    const employee = await Employee.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { name: req.body.name } },
      { new: true }
    ).populate('data');
    res.status(200).send(employee);
  } catch (error) {
    console.log(error);
  }
};
