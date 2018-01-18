const User = require('../models/User');
const Employee = require('../models/Employee');

module.exports.remove = async (req, res) => {
  try {
    const employee = await Employee.findById({ _id: req.params.id });
    employee.remove();
    await employee.save();
    const doc = await User.findOne({ login: req.query.login }).populate({
      path: 'employees',
      options: { sort: { name: 1 } },
      populate: { path: 'data' },
    });
    res.status(200).send(doc.employees);
  } catch (error) {
    console.log(error);
  }
};
